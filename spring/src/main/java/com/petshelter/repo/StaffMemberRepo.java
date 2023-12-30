package com.petshelter.repo;

import com.petshelter.model.StaffMember;
import com.petshelter.model.enums.Role;
import com.petshelter.model.requests.SignUpRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

@Data
@Repository
public class StaffMemberRepo implements UserProfileRepo {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public StaffMemberRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public StaffMember findByEmail(String email) {
        String sql = "SELECT * FROM staff_member WHERE staff_email = ?";
        ResultSetExtractor<StaffMember> resultSetExtractor = rs -> rs.next() ?
                StaffMember.builder()
                .id(rs.getLong(1))
                .name(rs.getString(2))
                .phone(rs.getString(3))
                .email(rs.getString(4))
                .passwordSalt(rs.getString(5))
                .passwordHash(rs.getString(6))
                .role(Role.valueOf(rs.getString(7)))
                .build() : null;
        return jdbcTemplate.query(sql, resultSetExtractor, email);
    }

    @Override
    public Long save(SignUpRequest signUpRequest, String passwordSalt, String passwordHash) {
        String sql = "INSERT INTO staff_member (staff_name, staff_phone, staff_email, staff_password_salt, staff_password_hash, staff_role) VALUES (?, ?, ?, ?, ?, ?)";
        Object[] args = {
                signUpRequest.getName(),
                signUpRequest.getPhone(),
                signUpRequest.getEmail(),
                passwordSalt,
                passwordHash,
                signUpRequest.getUserType()
        };
        jdbcTemplate.update(sql, args);

        Long id = jdbcTemplate.query("SELECT LAST_INSERT_ID()", rs -> rs.next() ? rs.getLong(1) : null);
        return id != null ? id : -1;
    }
}