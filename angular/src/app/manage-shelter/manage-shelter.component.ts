import { Component, OnInit } from '@angular/core';
import { Shelter } from '../models/Shelter';
import { Staff } from '../models/Staff';
import { ShelterManagementApiService } from '../shelter-management-api.service';

@Component({
  selector: 'app-manage-shelter',
  templateUrl: './manage-shelter.component.html',
  styleUrls: ['./manage-shelter.component.css']
})
export class ManageShelterComponent implements OnInit {

  shelters: Shelter[] = []

  constructor(private api: ShelterManagementApiService) { }

  ngOnInit() {
    this.api.getShelters().subscribe((shelters) => {
      this.shelters = shelters.map(shelter => { return { ...shelter, added: true }});
    });
  }

  handleShelterChange(shelter: Shelter) {
    console.log(shelter);
    if (shelter.added) {
      let index = this.shelters.findIndex(s => s.id == shelter.id);
      this.shelters[index] = shelter;

      const shelterInfo = {
        id: shelter.id,
        name: shelter.name,
        location: shelter.location,
        phone: shelter.phone,
        email: shelter.email
      }

      this.api.updateShelter(shelterInfo).subscribe((success) => {
        if (!success) {
          alert("Failed to update shelter");
          return;
        }
      });
    } else {
      this.api.addShelter(shelter).subscribe(shelterId => {
        if (shelterId == -1) {
          alert("Failed to add shelter");
          return;
        } else {
          this.api.getShelters().subscribe((shelters) => {
            this.shelters = shelters.map(shelter => { return { ...shelter, added: true }});
          })
        }
      });
    }
  }

  handleDeleteShelter(shelter: Shelter) {
    this.api.deleteShelter(shelter.id).subscribe((success) => {
      if (!success) {
        alert("Failed to delete shelter");
        return;
      }

      this.api.getShelters().subscribe((shelters) => {
        this.shelters = shelters.map(shelter => { return { ...shelter, added: true }});
      });
    });
  }

  handleFireStaff(staff: Staff) {
    let shelterIndex = this.shelters.findIndex(s => s.id == staff.shelterId);
    let staffIndex = this.shelters[shelterIndex].staff!.findIndex(s => s.id == staff.id);
    this.shelters[shelterIndex].staff!.splice(staffIndex, 1);
  }

  addShelter() {
    this.shelters.push({
      id: this.shelters.length == 0 ? 1 : Math.max(...this.shelters.map(shelter => shelter.id)) + 1,
      name: "",
      location: "",
      phone: "",
      email: "",
      staff: [],
      added: false
    });
  }
}
