import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetDocument } from '../models/PetDocument';
import { Pet } from '../models/Pet';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  img!: PetDocument;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pet) {}

  ngOnInit(): void {
    this.img = this.data.documents!.filter(doc => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(doc.name))[0];
  }
}
