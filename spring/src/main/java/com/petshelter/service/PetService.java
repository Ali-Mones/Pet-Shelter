package com.petshelter.service;

import com.petshelter.controller.PetController;
import com.petshelter.model.Pet;
import com.petshelter.model.Request.FilterRequest;
import com.petshelter.repo.PetRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    Logger logger = LoggerFactory.getLogger(PetController.class);
    @Autowired
    private PetRepo petRepo;

    public long addPet(Pet pet){
        logger.info("In addPet method of Pet Service");
        return petRepo.save(pet);
    }

    public Pet getPet(long petId){
        logger.info("In getPet method of pet Service");
        return petRepo.findById(petId);
    }

    public void updatePet(Pet pet){
        logger.info("In UpdatePet method of pet Service");
        petRepo.updatePetById(pet);
    }

    public void deletePet(long petId){
        logger.info("In deletePet method of pet Service");
        petRepo.deletePetById(petId);
    }
    public List<Pet> filterPets(FilterRequest filterRequest) {
        return petRepo.filterPets(filterRequest);
    }

    public FilterRequest getFilterAbleData(){
        return petRepo.getFilterAbleData();
    }

}
