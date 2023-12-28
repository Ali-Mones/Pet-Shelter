import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Shelter } from './shelter/shelter';
import { Staff } from './shelter/staff';

@Component({
  selector: 'app-manage-shelter',
  templateUrl: './manage-shelter.component.html',
  styleUrls: ['./manage-shelter.component.css']
})
export class ManageShelterComponent implements OnInit {

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
    }
  ]

  handleShelterChange(shelter: Shelter) {
    let index = this.shelters.findIndex(s => s.id == shelter.id);
    this.shelters[index] = shelter;
  }

  handleDeleteShelter(shelter: Shelter) {
    let index = this.shelters.findIndex(s => s.id == shelter.id);
    this.shelters.splice(index, 1);
  }

  handleFireStaff(staff: Staff) {
    let shelterIndex = this.shelters.findIndex(s => s.id == staff.shelterId);
    let staffIndex = this.shelters[shelterIndex].staff.findIndex(s => s.staffId == staff.staffId);
    this.shelters[shelterIndex].staff.splice(staffIndex, 1);
  }

  addShelter() {
    this.shelters.push({
      id: this.shelters.length == 0 ? 1 : Math.max(...this.shelters.map(shelter => shelter.id)) + 1,
      name: "",
      location: "",
      phone: "",
      email: "",
      staff: []
    });
  }
}
