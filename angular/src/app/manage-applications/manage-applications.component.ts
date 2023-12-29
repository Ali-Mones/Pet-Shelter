import { Component, OnInit } from '@angular/core';
import { AdoptionApplication } from '../models/AdoptionApplication';

@Component({
  selector: 'app-manage-applications',
  templateUrl: './manage-applications.component.html',
  styleUrls: ['./manage-applications.component.css']
})
export class ManageApplicationsComponent implements OnInit {

  applications: AdoptionApplication[] = [
    {
      adopter: {
        id: 1,
        name: "John Doe",
        email: "",
        phone: "",
        location: "",
      },
      pet: {
        id: 1,
        shelterId: 1,
        name: "Fido",
        species: "Dog",
        breed: "Labrador",
        age: 5,
        gender: "MALE",
        healthStatus: "Healthy",
        behaviour: "Friendly",
        description: "A very friendly dog",
        houseTraining: true,
        spayedNeutered: true,
      },
      applicationStatus: "PENDING"
    },
    {
      adopter: {
        id: 2,
        name: "Alice Doe",
        email: "",
        phone: "",
        location: "",
      },
      pet: {
        id: 1,
        shelterId: 1,
        name: "Rex",
        species: "Dog",
        breed: "Pitbull",
        age: 5,
        gender: "MALE",
        healthStatus: "Healthy",
        behaviour: "Aggressice",
        description: "A very aggressive dog",
        houseTraining: true,
        spayedNeutered: true,
      },
      applicationStatus: "PENDING"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
