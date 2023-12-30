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

    private boolean attributesOutOfBounds(AdoptionApplication adoptionApplication) {
        return adoptionApplication.getAdopterPhone().length() > 11 || adoptionApplication.getAdopterEmail().length() > 45;
    }

    public long addApp(AdoptionApplication adoptionApplication) {
        if (attributesOutOfBounds(adoptionApplication)) return -1;
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
        if (applicationRepo.notExists(id) || attributesOutOfBounds(adoptionApplicationUpdates)) return false;
        applicationRepo.update(id, adoptionApplicationUpdates);
        return true;
    }

    public boolean deleteApp(long id) {
        if (applicationRepo.notExists(id)) return false;
        applicationRepo.delete(id);
        return true;
    }
}