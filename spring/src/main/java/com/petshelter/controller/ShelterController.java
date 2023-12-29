package com.petshelter.controller;

import com.petshelter.model.Shelter;
import com.petshelter.model.StaffMember;
import com.petshelter.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public long addShelter(@RequestBody Shelter shelter) {
        return shelterService.addShelter(shelter);
    }

    @GetMapping("/getShelter/{id}")
    public Shelter getShelter(@PathVariable("id") long id) {
        return shelterService.getShelter(id);
    }

    @GetMapping("/getAllShelters")
    public List<Shelter> getAllShelters() {
        return shelterService.getAllShelters();
    }

    @PutMapping("/updateShelter/{id}")
    public boolean updateShelter(@PathVariable("id") long id, @RequestBody Shelter shelterUpdates) {
        return shelterService.updateShelter(id, shelterUpdates);
    }

    @DeleteMapping("/deleteShelter/{id}")
    public boolean deleteShelter(@PathVariable("id") long id) {
        return shelterService.deleteMapping(id);
    }

    @GetMapping("/getStaffMembers/{id}")
    public List<StaffMember> getStaffMembers(@PathVariable("id") long id) {
        return shelterService.getStaffMembers(id);
    }
}