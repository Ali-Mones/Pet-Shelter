package com.petshelter.controller;

import com.petshelter.model.Vaccination;
import com.petshelter.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/vaccination")
public class VaccinationController {
    private final VaccinationService vaccinationService;

    @Autowired
    public VaccinationController(VaccinationService vaccinationService) {
        this.vaccinationService = vaccinationService;
    }

    @PostMapping("/addVaccination")
    public Vaccination addVaccination(@RequestBody Vaccination vaccination) {
        return vaccinationService.addVaccination(vaccination);
    }

    @GetMapping("/getVaccination/{petId}/{vaccination}")
    public Vaccination getVaccination(@PathVariable("petId") long petId, @PathVariable("vaccination") String vaccination) {
        return vaccinationService.getVaccination(petId, vaccination);
    }

    @GetMapping("/getAllVaccinationsByPetId/{petId}")
    public List<Vaccination> getAllVaccinationsByPetId(@PathVariable("petId") long petId) {
        return vaccinationService.getAllVaccinationsByPetId(petId);
    }

    @PutMapping("/updateVaccination/{petId}")
    public boolean updateVaccinations(@PathVariable("petId") long petId, @RequestBody Vaccination vaccinationUpdates) {
        return vaccinationService.updateVaccinations(petId, vaccinationUpdates);
    }

    @DeleteMapping("/deleteVaccination/{petId}/{vaccination}")
    public boolean deleteVaccination(@PathVariable("petId") long petId, @PathVariable("vaccination") String vaccination) {
        return vaccinationService.deleteVaccination(petId, vaccination);
    }
}