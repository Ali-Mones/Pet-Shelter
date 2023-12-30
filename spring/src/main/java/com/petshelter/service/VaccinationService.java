package com.petshelter.service;

import com.petshelter.model.Vaccination;
import com.petshelter.repo.VaccinationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccinationService {
    private final VaccinationRepo vaccinationRepo;

    @Autowired
    public VaccinationService(VaccinationRepo vaccinationRepo) {
        this.vaccinationRepo = vaccinationRepo;
    }

    private boolean attributesOutOfBounds(Vaccination vaccination) {
        return vaccination.getVaccination().length() > 45;
    }

    public Vaccination addVaccination(Vaccination vaccination) {
        if (attributesOutOfBounds(vaccination)) return null;
        return vaccinationRepo.save(vaccination);
    }

    public Vaccination getVaccination(long petId, String vaccination) {
        if (vaccinationRepo.notExists(petId, vaccination)) return null;
        return vaccinationRepo.findById(petId, vaccination);
    }

    public List<Vaccination> getAllVaccinationsByPetId(long petId) {
        if (vaccinationRepo.isEmpty()) return null;
        return vaccinationRepo.findAllByPetId(petId);
    }

    public boolean updateVaccinations(long petId, Vaccination vaccinationUpdates) {
        if (vaccinationRepo.notExistsByPetId(petId) || attributesOutOfBounds(vaccinationUpdates)) return false;
        vaccinationRepo.updateAll(petId, vaccinationUpdates);
        return true;
    }

    public boolean deleteVaccination(long petId, String vaccination) {
        if (vaccinationRepo.notExists(petId, vaccination)) return false;
        vaccinationRepo.delete(petId, vaccination);
        return true;
    }
}