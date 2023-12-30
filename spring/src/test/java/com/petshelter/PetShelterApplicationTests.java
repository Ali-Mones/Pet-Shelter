package com.petshelter;

import com.petshelter.model.Pet;
import com.petshelter.model.Shelter;
import com.petshelter.model.Vaccination;
import com.petshelter.model.enums.Gender;
import com.petshelter.model.requests.SignUpRequest;
import com.petshelter.repo.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PetShelterApplicationTests {

	@Autowired
	private AdopterRepo adopterRepo;
	@Autowired
	private PetRepo petRepo;
	@Autowired
	private ShelterRepo shelterRepo;
	@Autowired
	private StaffMemberRepo staffMemberRepo;
	@Autowired
	private VaccinationRepo vaccinationRepo;

	@Test
    public void insertIntoAdopter() {
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			SignUpRequest signUpRequest = SignUpRequest.builder()
					.name("Adopter " + i)
					.phone("1234567890")
					.email("adopter" + i + "@gmail.com")
					.password("password")
					.build();
			adopterRepo.save(signUpRequest, "salt", "hash");
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Insert into adopter took " + (endTime - startTime) + " milliseconds");
	}

	@Test
	public void insertIntoPet() {
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			Pet pet = Pet.builder()
					.shelterId(i + 1)
					.adopterId(i + 1)
					.name("Pet " + i)
					.species("Species " + i)
					.breed("Breed " + i)
					.age(25)
					.gender(Gender.MALE)
					.healthStatus("Healthy")
					.behaviour("Good")
					.description("Description " + i)
					.houseTraining(true)
					.spayedNeutered(true)
					.build();
			petRepo.save(pet);
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Insert into pet took " + (endTime - startTime) + " milliseconds");
	}

	@Test
	public void insertIntoShelter() {
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			Shelter shelter = Shelter.builder()
					.name("Shelter " + i)
					.location("Location " + i)
					.phone("1234567890")
					.email("shelter" + i + "@gmail.com")
					.build();
			shelterRepo.save(shelter);
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Insert into shelter took " + (endTime - startTime) + " milliseconds");
	}

	@Test
	public void insertIntoStaffMember() {
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			SignUpRequest signUpRequest = SignUpRequest.builder()
					.name("Staff Member " + i)
					.phone("1234567890")
					.email("staff" + i + "@gmail.com")
					.password("password")
					.build();
			staffMemberRepo.save(signUpRequest, "salt", "hash");
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Insert into staff member took " + (endTime - startTime) + " milliseconds");
	}

	@Test
	public void insertIntoVaccination() {
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			Vaccination vaccination = Vaccination.builder()
					.petId(i + 1)
					.vaccination("Vaccination " + i)
					.build();
			vaccinationRepo.save(vaccination);
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Insert into vaccination took " + (endTime - startTime) + " milliseconds");
	}
}