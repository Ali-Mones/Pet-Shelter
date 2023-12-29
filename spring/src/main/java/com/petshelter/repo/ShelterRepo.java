package com.petshelter.repo;

import com.petshelter.model.Shelter;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Data
@Repository
public class ShelterRepo {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ShelterRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Shelter shelter) {
        String sql = "INSERT INTO shelter (shelter_name, shelter_location, shelter_phone, shelter_email) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, shelter.getName(), shelter.getLocation(), shelter.getPhone(), shelter.getEmail());
    }

    public boolean existsById(long id) {
        String sql = "SELECT COUNT(*) FROM shelter WHERE shelter_id = ?";
        ResultSetExtractor<Boolean> resultSetExtractor = rs -> rs.next() && rs.getInt(1) > 0;
        return Boolean.TRUE.equals(jdbcTemplate.query(sql, resultSetExtractor, id));
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
}