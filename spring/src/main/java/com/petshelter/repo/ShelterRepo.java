package com.petshelter.repo;

import com.petshelter.model.Shelter;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
}
