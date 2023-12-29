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
public class Shelter {
    private long id;
    private String name;
    private String location;
    private String phone;
    private String email;
}