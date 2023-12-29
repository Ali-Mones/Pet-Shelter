import { Component, Input, OnInit } from '@angular/core';
import { Pet } from '../manage-pets/pet';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {

  imgIndex: number = 0;

  imgList: string[] = [];

  @Input() pet!: Pet;
  
  constructor() { }

  ngOnInit(): void {
    this.imgList = this.pet.documents.filter(doc => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(doc.name)).map(doc => doc.name);
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
}
