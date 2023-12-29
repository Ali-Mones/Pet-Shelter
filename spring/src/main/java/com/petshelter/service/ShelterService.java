package com.petshelter.service;

import com.petshelter.model.Shelter;
import com.petshelter.repo.ShelterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShelterService {
    private final ShelterRepo shelterRepo;

    @Autowired
    public ShelterService(ShelterRepo shelterRepo) {
        this.shelterRepo = shelterRepo;
    }

    public boolean addShelter(Shelter shelter) {
        if (shelter.getName().length() > 45 || shelter.getLocation().length() > 45 || shelter.getPhone().length() > 11
                || shelter.getEmail().length() > 45) return false;
        
        shelterRepo.save(shelter);
        return true;
    }
}
