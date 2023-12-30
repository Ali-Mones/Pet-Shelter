package com.petshelter.model;

import com.petshelter.model.enums.Role;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.stereotype.Component;

@EqualsAndHashCode(callSuper = true)
@Data
@Component
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class StaffMember extends UserProfile {
    private Role role;
}