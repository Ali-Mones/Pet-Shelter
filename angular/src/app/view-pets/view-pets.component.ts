import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilterComponent } from '../filter/filter.component';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from '../models/Pet';
import { Filter } from '../models/Filter';
import { PetApiService } from '../services/pet-api.service';

@Component({
  selector: 'app-view-pets',
  templateUrl: './view-pets.component.html',
  styleUrls: ['./view-pets.component.css']
})
export class ViewPetsComponent implements OnInit {

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
          name: "https://www.dailypaws.com/thmb/Yt96TIoBelPtBXVCfQ5bpV63KUU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/siamese-cat-couch_525025708-2000-e914b62ff65f4df39a7f55b87bf49213.jpg",
          type: "image/jpeg",
          file: new Uint8Array()
        },
        {
          id: 4,
          petId: 1,
          name: "https://www.dailypaws.com/thmb/JWjLB6D7U9vw1Jo24q4YnbCnvmo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/siamese-two-kittens-1221624370-2000-c2330e63bd504a5ea883efc16fb8fe46.jpg",
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
          id: 1,
          petId: 2,
          name: "https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/758618/shiba-inu-dog-doge-dogecoin.jpeg",
          type: "image/jpeg",
          file: new Uint8Array()
        },
        {
          id: 2,
          petId: 2,
          name: "https://www.akc.org/wp-content/uploads/2017/11/Shiba-Inu-puppy-standing-outdoors.jpg",
          type: "image/jpeg",
          file: new Uint8Array()
        }
      ]
    }
  ]

  pageSize: number = 2;

  appliedFilter: Filter = {}

  filterableData: Filter = {
    species: ["Cat", "Dog"],
    breeds: ["Siamese", "Shiba Inu"],
    minAge: 0,
    maxAge: 10,
    shelterLocations: ["Toronto", "Mississauga"],
  }

  searchTimeout!: NodeJS.Timeout;

  constructor(public dialog: MatDialog, private api: PetApiService) {}

  ngOnInit(): void {
    this.api.filterPets(null, 0, this.pageSize).subscribe((pets) => {
      this.pets = pets;
      console.log("pets", this.pets);
      this.pets = this.pets.filter((pet, index) => index < this.pageSize);
    });
  }

  getPetCount() {
    return this.pets.length;
  }

  handlePageEvent(event: PageEvent) {
    this.api.filterPets(this.appliedFilter, event.pageIndex, this.pageSize).subscribe((pets) => {
      this.pets = pets;
    });
  }

  handleViewFilter() {
    this.api.getFilterableData().subscribe((filterableData) => {
      this.filterableData = filterableData;
    });

    const dialogRef = this.dialog.open(FilterComponent, { data: this.filterableData });
    dialogRef.afterClosed().subscribe(result => {
      this.appliedFilter = result;
      this.api.filterPets(this.appliedFilter, 0, this.pageSize).subscribe((pets) => {
        this.pets = pets;
      });
    });
  }

  handleSearch(event: any) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {

      console.log(event.target?.value)

      // send request to backend to search

    }, 500);
  }
}
