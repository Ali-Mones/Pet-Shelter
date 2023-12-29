package com.petshelter.model;

import com.petshelter.model.enums.Gender;
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
public class Pet {
    private long id;
    private long shelterId;
    private String name;
    private String species;
    private String breed;
    private int age;
    private Gender gender;
    private String healthStatus;
    private String behaviour;
    private String description;
    private Boolean houseTraining;
    private Boolean spayedNeutered;
}