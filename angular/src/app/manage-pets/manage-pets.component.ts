import { Component, OnInit } from '@angular/core';
import { Shelter } from '../models/Shelter';
import { Pet } from '../models/Pet';
import { PetDocument } from '../models/PetDocument';
import { PageEvent } from '@angular/material/paginator';

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
          file: new Blob()
        },
        {
          id: 4,
          petId: 1,
          name: "Document 2.png",
          type: "image/jpeg",
          file: new Blob()
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
          file: new Blob()
        },
        {
          id: 2,
          petId: 2,
          name: "Document 4",
          type: "image/jpeg",
          file: new Blob()
        }
      ]
    }
  ]

  pageSize = 1;

  constructor() { }

  ngOnInit(): void {
    // get pets of my shelter
    // get shelters under my management
    this.pets = this.pets.filter((pet, index) => index < this.pageSize);
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
      documents: []
    });
  }

  handlePetChange(pet: Pet) {
    console.log("change", pet);
    let index = this.pets.findIndex(p => p.id == pet.id);
    this.pets[index] = pet;
  }

  handleDeletePet(petId: number) {
    let index = this.pets.findIndex(p => p.id == petId);
    this.pets.splice(index, 1);
  }

  handleDocumentsChange(documents: PetDocument[]) {
    console.log("change", documents);
    let index = this.pets.findIndex(p => p.id == documents[0].petId);
    this.pets[index].documents = documents;
  }

  handlePageEvent(event: PageEvent) {
    this.pets = this.pets.filter((pet, index) => index >= event.pageIndex * event.pageSize && index < (event.pageIndex + 1) * event.pageSize);
  }
}
