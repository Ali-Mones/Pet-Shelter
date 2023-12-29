package com.petshelter.model;

import com.petshelter.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Builder
@Component
@NoArgsConstructor
@AllArgsConstructor
public class StaffMember {
    private long id;
    private String name;
    private Role role;
    private String phone;
    private String email;
    private String passwordSalt;
    private String passwordHash;
}