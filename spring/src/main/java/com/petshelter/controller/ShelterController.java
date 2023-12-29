package com.petshelter.controller;

import com.petshelter.model.Shelter;
import com.petshelter.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/Shelter")
public class ShelterController {
    private final ShelterService shelterService;

    @Autowired
    public ShelterController(ShelterService shelterService) {
        this.shelterService = shelterService;
    }

    @PostMapping("/addShelter")
    public boolean addShelter(@RequestBody Shelter shelter) {
        return shelterService.addShelter(shelter);
    }
}
