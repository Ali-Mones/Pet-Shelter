import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../models/Gender';
import { Pet } from '../models/Pet';
import { PetDocument } from '../models/PetDocument';
import { Shelter } from '../models/Shelter';
import { PetManagementApiService } from '../services/pet-management-api.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  constructor(private api: PetManagementApiService) { }

  @Input() pet!: Pet;
  @Input() shelters!: Shelter[];

  @Output() petChange = new EventEmitter<Pet>();
  @Output() deletePet = new EventEmitter<number>();
  @Output() documentsChange = new EventEmitter<PetDocument[]>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      petId: new FormControl<number>(this.pet.id),
      shelterId: new FormControl<number>(this.pet.shelterId, { validators: [Validators.required] }),
      name: new FormControl<string>(this.pet.name, { validators: [Validators.required, Validators.maxLength(45)] }),
      species: new FormControl<string>(this.pet.species, { validators: [Validators.required, Validators.maxLength(45)] }),
      breed: new FormControl<string>(this.pet.breed, { validators: [Validators.required, Validators.maxLength(45)] }),
      age: new FormControl<number>(this.pet.age, { validators: [Validators.required, Validators.min(0)] }),
      gender: new FormControl<Gender>(this.pet.gender, { validators: [Validators.required] }),
      healthStatus: new FormControl<string>(this.pet.healthStatus, { validators: [Validators.required, Validators.maxLength(255)] }),
      behaviour: new FormControl<string>(this.pet.behaviour, { validators: [Validators.required, Validators.maxLength(45)] }),
      description: new FormControl<string>(this.pet.description, { validators: [Validators.required, Validators.maxLength(255)] }),
      houseTraining: new FormControl<boolean>(this.pet.houseTraining),
      spayedNeutered: new FormControl<boolean>(this.pet.spayedNeutered),
      added: new FormControl<boolean>(this.pet.added!)
    });
  }

  handleEdits() {
    this.petChange.emit(this.form.value);
    this.documentsChange.emit(this.pet.documents);
  }

  handleDelete() {
    this.deletePet.emit(this.pet.id);
  }

  handleAddDocument(e: any): void {
    console.log(e.target.files);

    for (let file of e.target.files) {

      const document = {
        id: this.pet.documents!.length > 0 ? Math.max(...this.pet.documents!.map(doc => doc.id)) + 1 : 0,
        petId: this.pet.id,
        name: file.name,
        type: "image/jpeg",
        file: file
      };

      this.pet.documents!.push(document);

      this.api.saveDocument(document).subscribe((docId) => {
        if (docId > 0)
          this.pet.documents!.find((doc: PetDocument) => doc.file == file)!.id = docId;
        else
          this.pet.documents!.pop();
      });
    }
  }

  handleDeleteDocument(documentId: number): void {
    this.pet.documents = this.pet.documents!.filter((document: PetDocument) => documentId != document.id);
  }

  handleOpenDocument(doc: PetDocument) {
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([doc.file]));
    anchor.download = doc.name;
    anchor.click();
  }
}
