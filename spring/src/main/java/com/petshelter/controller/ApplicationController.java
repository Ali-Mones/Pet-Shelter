package com.petshelter.controller;

import com.petshelter.model.AdoptionApplication;
import com.petshelter.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/application")
public class ApplicationController {
    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/addApp")
    public AdoptionApplication addApp(@RequestBody AdoptionApplication adoptionApplication) {
        return applicationService.addApp(adoptionApplication);
    }

    @GetMapping("/getApp/{id}")
    public AdoptionApplication getApp(@PathVariable("id") long id) {
        return applicationService.getApp(id);
    }

    @GetMapping("/getAllAppsByPetId/{petId}")
    public List<AdoptionApplication> getAllAppsByPetId(@PathVariable("petId") long petId) {
        return applicationService.getAllAppsByPetId(petId);
    }

    @GetMapping("/getAllAppsByAdopterId/{adopterId}")
    public List<AdoptionApplication> getAllAppsByAdopterId(@PathVariable("adopterId") long adopterId) {
        return applicationService.getAllAppsByAdopterId(adopterId);
    }

    @PutMapping("/updateApp/{id}")
    public boolean updateApp(@PathVariable("id") long id, @RequestBody AdoptionApplication adoptionApplicationUpdates) {
        return applicationService.updateApp(id, adoptionApplicationUpdates);
    }

    @DeleteMapping("/deleteApp/{id}")
    public boolean deleteApp(@PathVariable("id") long id) {
        return applicationService.deleteApp(id);
    }
}