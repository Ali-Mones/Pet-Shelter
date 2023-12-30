import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetDocument } from '../models/PetDocument';
import { Pet } from '../models/Pet';
import { Filter } from '../models/Filter';

@Injectable({
  providedIn: 'root'
})
export class PetManagementApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8082/Pet/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = {
    headers: this.headers,
    responseType: 'json' as const,
  }

  addPet(pet: Pet): Observable<number> {
    return this.http.post<number>(this.url + 'addPet', JSON.stringify(pet), this.options);
  }

  updatePet(pet: Pet): Observable<void> {
    return this.http.put<void>(this.url + `updatePet`, JSON.stringify(pet), this.options);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `deletePet?petId=${id}`, this.options);  
  }

  filterPets(filter: Filter): Observable<Pet[]> {
    return this.http.post<Pet[]>(this.url + 'filterPets', JSON.stringify(filter), this.options);
  }

  getFilterableData(): Observable<Filter> {
    return this.http.get<Filter>(this.url + 'getFilterAbleData', this.options);
  }

  saveDocument(doc: PetDocument): Observable<number> {

    console.log(doc);
    const formdata: FormData = new FormData();

    formdata.set('id', doc.id.toString());
    formdata.set('petId', doc.petId.toString());
    formdata.set('name', doc.name);
    formdata.set('type', doc.type);
    formdata.append('files', doc.file);

    console.log(formdata.get('id'));


    return this.http.post<number>(this.url + 'saveDocument', formdata)
    // return this.http.post<number>(this.url + 'saveDocument', formdata, this.options);
  }

  getDocuments(petId: number): Observable<PetDocument[]> {
    return this.http.get<PetDocument[]>(this.url + `getAllDocuments?petId=${petId}`, this.options);
  }
}
