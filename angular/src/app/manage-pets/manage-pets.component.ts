import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/Pet';
import { PetDocument } from '../models/PetDocument';
import { PetManagementApiService } from '../services/pet-management-api.service';

@Component({
  selector: 'app-manage-pets',
  templateUrl: './manage-pets.component.html',
  styleUrls: ['./manage-pets.component.css']
})
export class ManagePetsComponent implements OnInit {


  shelters: Shelter[] = [
    {
      id: 1,
      name: "Shelter 1",
      location: "Location 1",
      phone: "12345678901",
      email: "shelter1@gmail.com",
    },
    {
      id: 2,
      name: "Shelter 2",
      location: "Location 2",
      phone: "12345678901",
      email: "",
    }
  ]

  pets: Pet[] = [
    {
      id: 1,
      shelterId: 1,
      name: "Pet 1",
      species: "Cat",
      breed: "Siamese",
      age: 1,
      gender: "FEMALE",
      healthStatus: "HEALTHY",
      behaviour: "Friendly",
      description: "Description 1",
      houseTraining: true,
      spayedNeutered: true,
      documents: [
        {
          id: 3,
          petId: 1,
          name: "Document 1.png",
          type: "image/jpeg",
          file: new Uint8Array()
        },
        {
          id: 4,
          petId: 1,
          name: "Document 2.png",
          type: "image/jpeg",
          file: new Uint8Array()
        }
      ]
    },
    {
      id: 2,
      shelterId: 1,
      name: "Pet 2",
      species: "Dog",
      breed: "Poodle",
      age: 1,
      gender: "MALE",
      healthStatus: "HEALTHY",
      behaviour: "Friendly",
      description: "Description 2",
      houseTraining: false,
      spayedNeutered: true,
      documents: [
        {
          id: 1,
          petId: 2,
          name: "Document 3",
          type: "image/jpeg",
          file: new Uint8Array()
        },
        {
          id: 2,
          petId: 2,
          name: "Document 4",
          type: "image/jpeg",
          file: new Uint8Array()
        }
      ]
    }
  ]


  pageSize = 1;

  constructor(private api: PetManagementApiService) { }

  ngOnInit(): void {
    // get pets of my shelter
    this.api.getPetsByStaffId(1).subscribe((pets) => {
      this.pets = pets.map(pet => { return { ...pet, added: true } });
      console.log(this.pets)
    });
  }

  getPetCount() {
    //TODO: get pet count of my shelter from backend
    return this.pets.length;
  }

  registerPet() {
    this.pets.push({
      id: this.pets.length == 0 ? 1 : Math.max(...this.pets.map(pet => pet.id)) + 1,
      shelterId: 1,
      name: "",
      species: "",
      breed: "",
      age: -1,
      gender: "FEMALE",
      healthStatus: "",
      behaviour: "",
      description: "",
      houseTraining: false,
      spayedNeutered: false,
      documents: [],
      added: false
    });
  }

  handlePetChange(pet: Pet) {
    if (pet.added) {
      this.api.updatePet(pet).subscribe((success) => {
        this.api.getPetsByStaffId(1).subscribe((pets) => {
          this.pets = pets;
        });
      });
    } else {
      this.api.addPet({ ...pet, shelterId: 11 }).subscribe((petId) => {
        this.api.getPetsByStaffId(1).subscribe((pets) => {
          this.pets = pets;
        });
      });
    }
  }

  handleDeletePet(petId: number) {
    this.api.deletePet(petId).subscribe((success) => {
      this.api.getPetsByStaffId(1).subscribe((pets) => {
        this.pets = pets;
      });
    });
  }

  handleDocumentsChange(documents: PetDocument[]) {
    if (!documents)
      return;

    console.log("doc change", documents);
    let index = this.pets.findIndex(p => p.id == documents[0].petId);
    if (index >= 0)
      this.pets[index].documents = documents;
  }
}
