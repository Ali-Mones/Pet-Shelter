import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filter } from '../models/Filter';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
[x: string]: any;

  constructor(public dialogRef: MatDialogRef<FilterComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Filter) {}

  ngOnInit(): void {
  }

  @ViewChild('speciesList') speciesList!: MatSelectionList;
  @ViewChild('breedsList') breedsList!: MatSelectionList;
  @ViewChild('locationsList') locationsList!: MatSelectionList;

  filter: Filter = { ...this.data };
  ageRange: number[] = [...Array(this.data.maxAge! - this.data.minAge! + 1).keys()].map((i) => i + this.data.minAge!);

  handleSelectAllSpecies() {
    this.filter.species = [...this.data.species!];
    this.speciesList.selectAll();
  }

  handleDeselectAllSpecies() {
    this.filter.species = [];
    this.speciesList.deselectAll();
  }

  handleSelectAllBreeds() {
    this.filter.breeds = [...this.data.breeds!];
    this.breedsList.selectAll();
  }

  handleDeselectAllBreeds() {
    this.filter.breeds = [];
    this.breedsList.deselectAll();
  }

  handleSelectAllLocations() {
    this.filter.shelterLocations = [...this.data.shelterLocations!];
    this.locationsList.selectAll();
  }

  handleDeselectAllLocations() {
    this.filter.shelterLocations = [];
    this.locationsList.deselectAll();
  }

  handleChangeSpecies(change: boolean, species: string) {
    if (change) {
      this.filter.species?.push(species);
    } else {
      this.filter.species = this.filter.species?.filter((s) => s !== species);
    }
  }

  handleChangeBreeds(change: boolean, breed: string) {
    if (change) {
      this.filter.breeds?.push(breed);
    } else {
      this.filter.breeds = this.filter.breeds?.filter((b) => b !== breed);
    }
  }

  handleChangeShelterLocations(change: boolean, location: string) {
    if (change) {
      this.filter.shelterLocations?.push(location);
    } else {
      this.filter.shelterLocations = this.filter.shelterLocations?.filter((l) => l !== location);
    }
  }

  handleChangeHouseTrained(change: string) {
    if (change == "yes") {
      this.filter.houseTraining = true;
    } else if (change == "no") {
      this.filter.houseTraining = false;
    } else {
      this.filter.houseTraining = undefined;
    }
  }

  handleChangeSpayedNeutered(change: string) {
    if (change == "yes") {
      this.filter.spayedNeutered = true;
    } else if (change == "no") {
      this.filter.spayedNeutered = false;
    } else {
      this.filter.spayedNeutered = undefined;
    }
  }

  applyFilter() {
    this.dialogRef.close(this.filter);
  }
}
