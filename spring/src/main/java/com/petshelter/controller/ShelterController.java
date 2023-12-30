package com.petshelter.controller;

import com.petshelter.model.Shelter;
import com.petshelter.model.StaffMember;
import com.petshelter.service.JwtService;
import com.petshelter.service.ShelterService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/shelter")
public class ShelterController {
    private final ShelterService shelterService;

    @Autowired
    private JwtService jwtService;

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

    @GetMapping("/getAllShelters/{staffId}")
    public List<Shelter> getAllShelters(@PathVariable("staffId") long staffId) {
        return shelterService.getAllShelters(staffId);
    }

    @PutMapping("/updateShelter/{id}")
    public boolean updateShelter(@PathVariable("id") long id, @RequestBody Shelter shelterUpdates) {
        return shelterService.updateShelter(id, shelterUpdates);
    }

    @DeleteMapping("/deleteShelter/{id}")
    public boolean deleteShelter(@PathVariable("id") long id) {
        return shelterService.deleteShelter(id);
    }

    @GetMapping("/getStaffMembers/{id}")
    public List<StaffMember> getStaffMembers(@PathVariable("id") long id) {
        return shelterService.getStaffMembers(id);
    }

    @GetMapping("/shelterId")
    public Long getShelterId(HttpServletRequest request) {
        Long id = jwtService.extractId(jwtService.token(request));
        return shelterService.shelterId(id);
    }
}