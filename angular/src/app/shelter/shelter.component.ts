import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Shelter } from '../models/Shelter';
import { Staff } from '../models/Staff';
import { ShelterManagementApiService } from '../services/shelter-management-api.service';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent implements OnInit {
  
  @Input() shelter!: Shelter;
  @Output() shelterChange = new EventEmitter<Shelter>();
  @Output() deleteShelter = new EventEmitter<Shelter>();
  @Output() fireStaff = new EventEmitter<Staff>();
  form!: FormGroup;

  constructor(private api: ShelterManagementApiService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl<number>(this.shelter.id),
      name: new FormControl<string>(this.shelter.name, { validators: [Validators.required, Validators.maxLength(45)] }),
      location: new FormControl<string>(this.shelter.location, { validators: [Validators.required, Validators.maxLength(45)] }),
      phone: new FormControl<string>(this.shelter.phone, { validators: [Validators.required, Validators.pattern("^[0-9]{11}$")] }),
      email: new FormControl<string>(this.shelter.email, { validators: [Validators.required, Validators.email, Validators.maxLength(45)] }),
      staff: new FormControl<Staff[]>(this.shelter.staff!),
      added: new FormControl<boolean>(this.shelter.added!)
    });

    if (this.shelter.added && this.shelter.staff == null) {
      this.api.getShelterStaff(this.shelter.id).subscribe((staff) => {
        staff = staff.map(s => { return { ...s, shelterId: this.shelter.id }});
        this.shelterChange.emit({ ...this.shelter, staff: staff });
      });
    }
  }
}
