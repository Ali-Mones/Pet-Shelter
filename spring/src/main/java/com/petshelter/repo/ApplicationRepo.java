package com.petshelter.repo;

import com.petshelter.model.AdoptionApplication;
import com.petshelter.model.enums.ApplicationStatus;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Data
@Repository
public class ApplicationRepo {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ApplicationRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean notExists(long id) {
        String sql = "SELECT COUNT(*) FROM adoption_application WHERE adopter_id = ?";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> rs.next() && rs.getInt(1) > 0;
        return Boolean.FALSE.equals(jdbcTemplate.query(sql, resultSetExtractor, id));
    }

    public boolean isEmpty() {
        String sql = "SELECT COUNT(*) FROM adoption_application";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> !(rs.next() && rs.getInt(1) > 0);
        return Boolean.TRUE.equals(jdbcTemplate.query(sql, resultSetExtractor));
    }

    public long save(AdoptionApplication adoptionApplication) {
        String sql = "INSERT INTO adoption_application (pet_id, adopter_id, adopter_phone, adopter_email, application_status) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, adoptionApplication.getPetId(), adoptionApplication.getAdopterId(),
                adoptionApplication.getAdopterPhone(), adoptionApplication.getAdopterEmail(),
                adoptionApplication.getApplicationStatus().toString());
        Long id = jdbcTemplate.query("SELECT LAST_INSERT_ID()", rs -> rs.next() ? rs.getLong(1) : null);
        return id != null ? id : -1;
    }

    public AdoptionApplication findById(long id) {
        String sql = "SELECT * FROM adoption_application WHERE adopter_id = ?";
        ResultSetExtractor<AdoptionApplication> resultSetExtractor = rs -> rs.next() ?
                AdoptionApplication.builder()
                .id(rs.getLong(1))
                .petId(rs.getLong(2))
                .adopterId(rs.getLong(3))
                .adopterPhone(rs.getString(4))
                .adopterEmail(rs.getString(5))
                .applicationStatus(ApplicationStatus.valueOf(rs.getString(6)))
                .build() : null;
        return jdbcTemplate.query(sql, resultSetExtractor, id);
    }

    public List<AdoptionApplication> findAllByPetId(long petId) {
        String sql = """
            SELECT aa.*
            FROM pet p
            JOIN adoption_application aa
            USING (pet_id)
            WHERE pet_id = ?
            """;
        return getAdoptionApplications(petId, sql);
    }

    public List<AdoptionApplication> findAllByAdopterId(long adopterId) {
        String sql = """
            SELECT aa.*
            FROM adopter a
            JOIN adoption_application aa
            USING (adopter_id)
            WHERE adopter_id = ?
            """;
        return getAdoptionApplications(adopterId, sql);
    }

    private List<AdoptionApplication> getAdoptionApplications(long foreignKey, String sql) {
        RowMapper<AdoptionApplication> rowMapper = (rs, rn) ->
                AdoptionApplication.builder()
                        .id(rs.getLong(1))
                        .petId(rs.getLong(2))
                        .adopterId(rs.getLong(3))
                        .adopterPhone(rs.getString(4))
                        .adopterEmail(rs.getString(5))
                        .applicationStatus(ApplicationStatus.valueOf(rs.getString(6)))
                        .build();
        return jdbcTemplate.query(sql, rowMapper, foreignKey);
    }

    public void update(long id, AdoptionApplication applicationUpdates) {
        StringBuilder sql = new StringBuilder("UPDATE adoption_application SET pet_id = ?, adopter_id = ?, ");
        List<Object> updates = new ArrayList<>(List.of(applicationUpdates.getPetId(), applicationUpdates.getAdopterId()));

        if (applicationUpdates.getAdopterPhone() != null) {
            sql.append("adopter_phone = ?, ");
            updates.add(applicationUpdates.getAdopterPhone());
        }
        if (applicationUpdates.getAdopterEmail() != null) {
            sql.append("adopter_email = ?, ");
            updates.add(applicationUpdates.getAdopterEmail());
        }
        if (applicationUpdates.getApplicationStatus() != null) {
            sql.append("application_status = ? ");
            updates.add(applicationUpdates.getApplicationStatus().toString());
        }
        sql.append("WHERE adopter_id = ?");
        updates.add(id);
        Object[] params = updates.toArray();
        jdbcTemplate.update(sql.toString(), params);
    }

    public void delete(long id) {
        String sql = "DELETE FROM adoption_application WHERE application_id = ?";
        jdbcTemplate.update(sql, id);
    }
}