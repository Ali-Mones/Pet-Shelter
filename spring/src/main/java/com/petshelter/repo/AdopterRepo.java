package com.petshelter.repo;

import com.petshelter.model.Adopter;
import com.petshelter.model.requests.SignUpRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

@Data
@Repository
public class AdopterRepo implements UserProfileRepo {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public AdopterRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Adopter findByEmail(String email) {
        String sql = "SELECT * FROM adopter WHERE adopter_email = ?";
        ResultSetExtractor<Adopter> resultSetExtractor = rs -> rs.next() ?
                Adopter.builder()
                .id(rs.getLong(1))
                .name(rs.getString(2))
                .phone(rs.getString(3))
                .email(rs.getString(4))
                .passwordSalt(rs.getString(5))
                .passwordHash(rs.getString(6))
                .build() : null;
        return jdbcTemplate.query(sql, resultSetExtractor, email);
    }

    @Override
    public void save(SignUpRequest signUpRequest, String passwordSalt, String passwordHash) {
        String sql = "INSERT INTO adopter (adopter_name, adopter_phone, adopter_email, adopter_password_salt, adopter_password_hash) VALUES (?, ?, ?, ?, ?)";
        Object[] args = {
                signUpRequest.getName(),
                signUpRequest.getPhone(),
                signUpRequest.getEmail(),
                passwordSalt,
                passwordHash
        };
        jdbcTemplate.update(sql, args);
    }
}