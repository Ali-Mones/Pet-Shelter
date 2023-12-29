package com.petshelter.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Blob;

@Data
@Builder
@Component
@NoArgsConstructor
@AllArgsConstructor
public class PetDocument {
    private long id;
    private long petId;
    private String documentType;
    private Blob document;
}