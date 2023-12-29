package com.petshelter.model;

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
public class Adopter {
    private long id;
    private String name;
    private String email;
    private String passwordSalt;
    private String passwordHash;
}