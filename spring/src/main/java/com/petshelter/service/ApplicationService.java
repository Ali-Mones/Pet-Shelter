package com.petshelter.service;

import com.petshelter.model.AdoptionApplication;
import com.petshelter.repo.ApplicationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {
    private final ApplicationRepo applicationRepo;

    @Autowired
    public ApplicationService(ApplicationRepo applicationRepo) {
        this.applicationRepo = applicationRepo;
    }


    public AdoptionApplication addApp(AdoptionApplication adoptionApplication) {
        return applicationRepo.save(adoptionApplication);
    }

    public AdoptionApplication getApp(long id) {
        if (applicationRepo.notExists(id)) return null;
        return applicationRepo.findById(id);
    }

    public List<AdoptionApplication> getAllAppsByPetId(long petId) {
        if (applicationRepo.isEmpty()) return null;
        return applicationRepo.findAllByPetId(petId);
    }

    public List<AdoptionApplication> getAllAppsByAdopterId(long adopterId) {
        if (applicationRepo.isEmpty()) return null;
        return applicationRepo.findAllByAdopterId(adopterId);
    }

    public boolean updateApp(long id, AdoptionApplication adoptionApplicationUpdates) {
        if (applicationRepo.notExists(id)) return false;
        applicationRepo.update(id, adoptionApplicationUpdates);
        return true;
    }

    public boolean deleteApp(long id) {
        if (applicationRepo.notExists(id)) return false;
        applicationRepo.delete(id);
        return true;
    }
}