package com.petshelter.service;

import com.petshelter.model.Shelter;
import com.petshelter.model.StaffMember;
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

    public long addShelter(Shelter shelter) {
        // TODO: ADD STAFF_MEMBER_SHELTER TO TABLE

        if (attributesOutOfBounds(shelter)) return -1;
        return shelterRepo.save(shelter);
    }

    public Shelter getShelter(long id) {
        if (shelterRepo.notExists(id)) return null;
        return shelterRepo.findById(id);
    }

    public List<Shelter> getAllShelters(long staffId) {
        if (shelterRepo.isEmpty()) return null;
        return shelterRepo.findAll(staffId);
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

    public List<StaffMember> getStaffMembers(long id) {
        if (shelterRepo.notExists(id)) return null;
        return shelterRepo.findShelterStaffMembersById(id);
    }

    // TODO: ADD FIRE STAFF
}