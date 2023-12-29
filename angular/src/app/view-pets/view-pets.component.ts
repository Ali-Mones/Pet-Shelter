import { Component, OnInit } from '@angular/core';
import { Pet } from '../manage-pets/pet';

@Component({
  selector: 'app-view-pets',
  templateUrl: './view-pets.component.html',
  styleUrls: ['./view-pets.component.css']
})
export class ViewPetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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
          name: "https://www.dailypaws.com/thmb/Yt96TIoBelPtBXVCfQ5bpV63KUU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/siamese-cat-couch_525025708-2000-e914b62ff65f4df39a7f55b87bf49213.jpg",
          file: new Blob()
        },
        {
          documentId: 4,
          petId: 1,
          name: "https://www.dailypaws.com/thmb/JWjLB6D7U9vw1Jo24q4YnbCnvmo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/siamese-two-kittens-1221624370-2000-c2330e63bd504a5ea883efc16fb8fe46.jpg",
          file: new Blob()
        }
      ]
    },
    {
      petId: 2,
      shelterId: 1,
      name: "Pet 2",
      species: "Dog",
      breed: "Shiba Inu",
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
          name: "https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/758618/shiba-inu-dog-doge-dogecoin.jpeg",
          file: new Blob()
        },
        {
          documentId: 2,
          petId: 2,
          name: "https://www.akc.org/wp-content/uploads/2017/11/Shiba-Inu-puppy-standing-outdoors.jpg",
          file: new Blob()
        }
      ]
    }
  ]

}
