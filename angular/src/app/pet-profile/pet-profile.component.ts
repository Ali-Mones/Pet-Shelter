import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PetDetailsComponent } from '../pet-details/pet-details.component';
import { Pet } from '../models/Pet';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {

  imgIndex: number = 0;

  imgList: string[] = [];

  @Input() pet!: Pet;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.imgList = this.pet.documents!.filter(doc => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(doc.name)).map(doc => doc.name);
  }

  getNextImage() {
    this.imgIndex = (this.imgIndex + 1) % this.imgList.length;
  }

  getPreviousImage() {
    this.imgIndex = (this.imgIndex - 1 + this.imgList.length) % this.imgList.length;
  }

  handleAdopt() {
    alert("Adopted!");
  }

  handleViewDetails(pet: Pet) {
    this.dialog.open(PetDetailsComponent, {
      data: pet
    });
  }
}
