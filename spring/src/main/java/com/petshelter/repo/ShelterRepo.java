package com.petshelter.repo;

import com.petshelter.model.Shelter;
import com.petshelter.model.StaffMember;
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
public class ShelterRepo {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ShelterRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public long save(Shelter shelter) {
        String sql = "INSERT INTO shelter (shelter_name, shelter_location, shelter_phone, shelter_email) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, shelter.getName(), shelter.getLocation(), shelter.getPhone(), shelter.getEmail());
        return jdbcTemplate.query("SELECT LAST_INSERT_ID()", rs -> rs.next() ? rs.getLong(1) : null);
    }

    public boolean notExists(long id) {
        String sql = "SELECT COUNT(*) FROM shelter WHERE shelter_id = ?";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> rs.next() && rs.getInt(1) > 0;
        return Boolean.FALSE.equals(jdbcTemplate.query(sql, resultSetExtractor, id));
    }

    public Shelter findById(long id) {
        String sql = "SELECT * FROM shelter WHERE shelter_id = ?";
        ResultSetExtractor<Shelter> resultSetExtractor = rs -> rs.next() ?
                Shelter.builder()
                .id(rs.getLong(1))
                .name(rs.getString(2))
                .location(rs.getString(3))
                .phone(rs.getString(4))
                .email(rs.getString(5))
                .build() : null;
        return jdbcTemplate.query(sql, resultSetExtractor, id);
    }

    public boolean isEmpty() {
        String sql = "SELECT COUNT(*) FROM shelter";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> !(rs.next() && rs.getInt(1) > 0);
        return Boolean.TRUE.equals(jdbcTemplate.query(sql, resultSetExtractor));
    }

    public List<Shelter> findAll() {
        String sql = "SELECT * FROM shelter";
        RowMapper<Shelter> rowMapper = (rs, rn) ->
                Shelter.builder()
                .id(rs.getLong(1))
                .name(rs.getString(2))
                .location(rs.getString(3))
                .phone(rs.getString(4))
                .email(rs.getString(5))
                .build();
        return jdbcTemplate.query(sql, rowMapper);
    }

    public void update(long id, Shelter shelterUpdates) {
        StringBuilder sql = new StringBuilder("UPDATE shelter SET ");
        List<Object> updates = new ArrayList<>();
        if (shelterUpdates.getName() != null) {
            sql.append("shelter_name = ?, ");
            updates.add(shelterUpdates.getName());
        }
        if (shelterUpdates.getLocation() != null) {
            sql.append("shelter_location = ?, ");
            updates.add(shelterUpdates.getLocation());
        }
        if (shelterUpdates.getPhone() != null) {
            sql.append("shelter_phone = ?, ");
            updates.add(shelterUpdates.getPhone());
        }
        if (shelterUpdates.getEmail() != null) {
            sql.append("shelter_email = ? ");
            updates.add(shelterUpdates.getEmail());
        }
        sql.append("WHERE shelter_id = ?");
        updates.add(id);
        Object[] params = updates.toArray();
        jdbcTemplate.update(sql.toString(), params);
    }

    public void delete(long id) {
        String sql = "DELETE FROM shelter WHERE shelter_id = ?";
        jdbcTemplate.update(sql, id);
    }

    public List<StaffMember> findShelterStaffMembersById(long id) {
        String sql = """
                    SELECT *
                    FROM staff_member
                    WHERE shelter_id = ?
                """;
        RowMapper<StaffMember> rowMapper = (rs, rm) -> StaffMember.builder()
                .id(rs.getLong(1))
                .shelterId(rs.getLong(2))
                .name(rs.getString(3))
                .role(rs.getString(4))
                .phone(rs.getString(5))
                .email(rs.getString(6))
                .passwordSalt(rs.getString(7))
                .passwordHash(rs.getString(8))
                .build();
        return jdbcTemplate.query(sql, rowMapper, id);
    }
}