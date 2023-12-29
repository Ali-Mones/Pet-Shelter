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

  constructor(private api: ShelterManagementApiService) { }

  ngOnInit(): void {
  }

  shelters: Shelter[] = []

  handleShelterChange(shelter: Shelter) {
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
    } else {
      // send request to backend
      this.api.addShelter(shelter).subscribe(shelterId => {
        if (shelterId == -1) {
          alert("Failed to add shelter");
          return;
        } else {
          document.location.reload();
        }
      });
    }
  }

  handleDeleteShelter(shelter: Shelter) {
    let index = this.shelters.findIndex(s => s.id == shelter.id);
    this.shelters.splice(index, 1);
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
