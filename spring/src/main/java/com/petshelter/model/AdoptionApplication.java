package com.petshelter.model;

import com.petshelter.model.enums.ApplicationStatus;
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
public class AdoptionApplication {
    private long petId;
    private long adopterId;
    private ApplicationStatus applicationStatus;
}