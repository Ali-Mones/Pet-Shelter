package com.petshelter.model.Request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Builder
@Component
@NoArgsConstructor
@AllArgsConstructor
public class FilterRequest {
    private List<String> species;
    private List<String> breeds;
    private List<String> shelterLocations;
    private Integer minAge;
    private Integer maxAge;
    private Boolean houseTraining;
    private Boolean spayedNeutered;
}
