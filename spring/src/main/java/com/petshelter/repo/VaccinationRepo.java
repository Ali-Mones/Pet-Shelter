package com.petshelter.repo;

import com.petshelter.model.Vaccination;
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
public class VaccinationRepo {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public VaccinationRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean notExists(long petId, String vaccination) {
        String sql = "SELECT COUNT(*) FROM vaccination WHERE pet_id = ? AND vaccination = ?";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> rs.next() && rs.getInt(1) > 0;
        return Boolean.FALSE.equals(jdbcTemplate.query(sql, resultSetExtractor, petId, vaccination));
    }

    public boolean notExistsByPetId(long petId) {
        String sql = "SELECT COUNT(*) FROM vaccination WHERE pet_id = ?";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> rs.next() && rs.getInt(1) > 0;
        return Boolean.FALSE.equals(jdbcTemplate.query(sql, resultSetExtractor, petId));
    }

    public boolean isEmpty() {
        String sql = "SELECT COUNT(*) FROM vaccination";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> !(rs.next() && rs.getInt(1) > 0);
        return Boolean.TRUE.equals(jdbcTemplate.query(sql, resultSetExtractor));
    }

    public Vaccination save(Vaccination vaccination) {
        String sql = "INSERT INTO vaccination (pet_id, vaccination) VALUES (?, ?)";
        jdbcTemplate.update(sql, vaccination.getPetId(), vaccination.getVaccination());
        return vaccination;
    }

    public Vaccination findById(long petId, String vaccination) {
        String sql = "SELECT * FROM vaccination WHERE pet_id = ? AND vaccination = ?";
        ResultSetExtractor<Vaccination> resultSetExtractor = rs -> rs.next() ?
                Vaccination.builder()
                        .petId(rs.getLong(1))
                        .vaccination(rs.getString(2))
                        .build() : null;
        return jdbcTemplate.query(sql, resultSetExtractor, petId, vaccination);
    }

    public List<Vaccination> findAllByPetId(long petId) {
        String sql = """
            SELECT v.*
            FROM pet p
            JOIN vaccination v
            USING (pet_id)
            WHERE pet_id = ?
            """;
        RowMapper<Vaccination> rowMapper = (rs, rowNum) -> Vaccination.builder()
                .petId(rs.getLong(1))
                .vaccination(rs.getString(2))
                .build();
        return jdbcTemplate.query(sql, rowMapper, petId);
    }

    public void updateAll(long petId, Vaccination vaccinationUpdates) {
        StringBuilder sql = new StringBuilder("UPDATE vaccination SET ");
        List<Object> updates = new ArrayList<>();
        if (vaccinationUpdates.getVaccination() != null) {
            sql.append("vaccination = ? ");
            updates.add(vaccinationUpdates.getVaccination());
        }
        sql.append("WHERE pet_id = ?");
        updates.add(petId);
        Object[] params = updates.toArray();
        jdbcTemplate.update(sql.toString(), params);
    }

    public void delete(long petId, String vaccination) {
        String sql = "DELETE FROM vaccination WHERE pet_id = ? AND vaccination = ?";
        jdbcTemplate.update(sql, petId, vaccination);
    }
}