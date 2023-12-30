import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilterComponent } from '../filter/filter.component';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from '../models/Pet';
import { Filter } from '../models/Filter';

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

  viewPets: Pet[] = this.pets.filter((pet, index) => index < this.pageSize);

  appliedFilter: Filter = {}

  filterableData: Filter = {
    species: ["Cat", "Dog"],
    breeds: ["Siamese", "Shiba Inu"],
    minAge: 0,
    maxAge: 10,
    shelterLocations: ["Toronto", "Mississauga"],
  }

  searchTimeout!: NodeJS.Timeout;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // send request to backend to get pet count
    // send request to backend to get pets for page with pageIndex = 0, page size = page size 
  }

  getPetCount() {
    return 2;
  }

  handlePageEvent(event: PageEvent) {
    this.viewPets = this.pets.filter((pet, index) => index >= event.pageIndex * event.pageSize && index < (event.pageIndex + 1) * event.pageSize);
  }

  handleViewFilter() {

    // send request to backend to find filterable data

    const dialogRef = this.dialog.open(FilterComponent, { data: this.filterableData });
    dialogRef.afterClosed().subscribe(result => {
      this.appliedFilter = result;
      // send request to backend to filter
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
