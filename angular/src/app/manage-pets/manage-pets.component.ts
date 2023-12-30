import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/Pet';
import { PetDocument } from '../models/PetDocument';
import { PetManagementApiService } from '../services/pet-management-api.service';
import { Shelter } from '../models/Shelter';
import { ShelterManagementApiService } from '../services/shelter-management-api.service';

@Component({
  selector: 'app-manage-pets',
  templateUrl: './manage-pets.component.html',
  styleUrls: ['./manage-pets.component.css']
})
export class ManagePetsComponent implements OnInit {


  shelters: Shelter[] = []

  pets: Pet[] = []


  pageSize = 20;

  constructor(private api: PetManagementApiService, private shelterApi: ShelterManagementApiService) { }

  ngOnInit(): void {

    this.shelterApi.shelterId().subscribe((shelterId) => { 
      this.api.getPetsByStaffId(shelterId).subscribe((pets) => {
        this.pets = pets.map(pet => { return { ...pet, added: true } });
      });
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
