package com.petshelter.controller;

import com.petshelter.model.Pet;
import com.petshelter.model.PetDocument;
import com.petshelter.model.Request.FilterRequest;
import com.petshelter.service.PetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/Pet")
public class PetController {

    Logger logger = LoggerFactory.getLogger(PetController.class);
    @Autowired
    private PetService petService;

    @PostMapping("/addPet")
    public long addPet(@RequestBody Pet pet) {
        logger.info("In addPet method of Controller");
        return petService.addPet(pet);
    }

    @GetMapping("/getPet")
    public Pet getPet(@RequestParam long petId) {
        logger.info("In getPet method of Controller");
        return petService.getPet(petId);
    }

    @PutMapping("/updatePet")
    public void updatePet(@RequestBody Pet pet){
        logger.info("In UpdatePet method of pet Service");
        petService.updatePet(pet);
    }

    @DeleteMapping("/deletePet")
    public void deletePet(@RequestParam long petId) {
        logger.info("In deletePet method of Controller");
        petService.deletePet(petId);
    }

    @GetMapping("/filterPets")
    public List<Pet> filterPets (@RequestBody FilterRequest filterRequest, @RequestParam int pageSize, @RequestParam int pageIndex){
        return petService.filterPets(filterRequest, pageSize, pageIndex);
    }

    @GetMapping("/getFilterAbleData")
    public FilterRequest getFilterAbleData(){
        return petService.getFilterAbleData();
    }

    @PostMapping("/saveDocument")
    public long saveDocument(@RequestBody MultipartFile petDocument){
        return petService.saveDocument(petDocument);
    }

    @PostMapping("/getAllDocuments")
    public List<Blob> getAllDocuments(@RequestParam long petId){
        return petService.getAllDocuments(petId);
    }
}

