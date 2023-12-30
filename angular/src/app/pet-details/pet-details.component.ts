import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetDocument } from '../models/PetDocument';
import { Pet } from '../models/Pet';
import { PetManagementApiService } from '../services/pet-management-api.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  img!: PetDocument;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pet, private api: PetManagementApiService) {}

  ngOnInit(): void {
    console.log(this.data);
    this.api.getDocuments(this.data.id).subscribe((documents) => {
      this.data.documents = documents;

      if (this.data.documents!.filter(doc => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(doc.name)).length > 0)
        this.img = this.data.documents!.filter(doc => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(doc.name))[0];
    });
  }

  handleOpenDocument(doc: PetDocument) {
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([doc.file]));
    anchor.download = doc.name;
    anchor.click();
  }
}
