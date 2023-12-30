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

  pets: Pet[] = []

  pageSize: number = 2;

  appliedFilter: Filter = {}

  filterableData: Filter = {
    species: [],
    breeds: [],
    minAge: 0,
    maxAge: 0,
    shelterLocations: [],
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
