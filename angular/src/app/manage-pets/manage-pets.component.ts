import { Component, OnInit } from '@angular/core';
import { Pet, PetDocument } from './pet';
import { Shelter } from '../manage-shelter/shelter/shelter';

@Component({
  selector: 'app-manage-pets',
  templateUrl: './manage-pets.component.html',
  styleUrls: ['./manage-pets.component.css']
})
export class ManagePetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  shelters: Shelter[] = [
    {
      id: 1,
      name: "Shelter 1",
      location: "Location 1",
      phone: "12345678901",
      email: "shelter1@gmail.com",
      staff: [
        {
          staffId: 1,
          shelterId: 1,
          name: "Staff 1",
          role: "Role 1",
          phone: "12345678901",
          email: ""
        },
        {
          staffId: 2,
          shelterId: 1,
          name: "Staff 2",
          role: "Role 2",
          phone: "12345678901",
          email: ""
        }
      ]
    },
    {
      id: 2,
      name: "Shelter 2",
      location: "Location 2",
      phone: "12345678901",
      email: "",
      staff: [
        {
          staffId: 3,
          shelterId: 2,
          name: "Staff 3",
          role: "Role 3",
          phone: "12345678901",
          email: ""
        },
        {
          staffId: 4,
          shelterId: 2,
          name: "Staff 4",
          role: "Role 4",
          phone: "12345678901",
          email: ""
        }
      ]
    }

  ]

  pets: Pet[] = [
    {
      petId: 1,
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
          documentId: 3,
          petId: 1,
          name: "Document 1.png",
          file: new Blob()
        },
        {
          documentId: 4,
          petId: 1,
          name: "Document 2.png",
          file: new Blob()
        }
      ]
    },
    {
      petId: 2,
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
          documentId: 1,
          petId: 2,
          name: "Document 3",
          file: new Blob()
        },
        {
          documentId: 2,
          petId: 2,
          name: "Document 4",
          file: new Blob()
        }
      ]
    }
  ]

  registerPet() {
    this.pets.push({
      petId: this.pets.length == 0 ? 1 : Math.max(...this.pets.map(pet => pet.petId)) + 1,
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
    let index = this.pets.findIndex(p => p.petId == pet.petId);
    this.pets[index] = pet;
  }

  handleDeletePet(petId: number) {
    let index = this.pets.findIndex(p => p.petId == petId);
    this.pets.splice(index, 1);
  }

  handleDocumentsChange(documents: PetDocument[]) {
    console.log("change", documents);
    let index = this.pets.findIndex(p => p.petId == documents[0].petId);
    this.pets[index].documents = documents;
  }
}
