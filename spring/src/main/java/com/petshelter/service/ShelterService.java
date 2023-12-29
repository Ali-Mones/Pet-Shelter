package com.petshelter.service;

import com.petshelter.model.Shelter;
import com.petshelter.repo.ShelterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShelterService {
    private final ShelterRepo shelterRepo;

    @Autowired
    public ShelterService(ShelterRepo shelterRepo) {
        this.shelterRepo = shelterRepo;
    }

    private boolean attributesOutOfBounds(Shelter shelter) {
        return shelter.getName().length() > 45 || shelter.getLocation().length() > 45 ||
                shelter.getPhone().length() > 11 || shelter.getEmail().length() > 45;
    }

    public boolean addShelter(Shelter shelter) {
        if (attributesOutOfBounds(shelter)) return false;
        shelterRepo.save(shelter);
        return true;
    }

    public Shelter getShelter(long id) {
        if (shelterRepo.notExists(id)) return null;
        return shelterRepo.findById(id);
    }

    public List<Shelter> getAllShelters() {
        if (shelterRepo.isEmpty()) return null;
        return shelterRepo.findAll();
    }

    public boolean updateShelter(long id, Shelter shelterUpdates) {
        if (shelterRepo.notExists(id) || attributesOutOfBounds(shelterUpdates)) return false;
        shelterRepo.update(id, shelterUpdates);
        return true;
    }

    public boolean deleteMapping(long id) {
        if (shelterRepo.notExists(id)) return false;
        shelterRepo.delete(id);
        return true;
    }
}