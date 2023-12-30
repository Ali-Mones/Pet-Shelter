import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetDocument } from '../models/PetDocument';
import { Pet } from '../models/Pet';

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
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.post<number>(this.url + 'addPet', JSON.stringify(pet), options);
  }

  updatePet(pet: Pet): Observable<void> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.put<void>(this.url + `updatePet`, JSON.stringify(pet), options);
  }

  deletePet(id: number): Observable<void> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.delete<void>(this.url + `deletePet/${id}`, options);  
  }

  getPetsByStaffId(id: number): Observable<Pet[]> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.get<Pet[]>(this.url + `getPets/${id}`, options);
  }

  saveDocument(doc: PetDocument): Observable<number> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };

    const formdata: FormData = new FormData();
   
    formdata.append('petId', doc.petId.toString());
    formdata.append('name', doc.name);
    formdata.append('type', doc.type);
    formdata.append('file', new Blob([doc.file]));

    return this.http.post<number>(this.url + 'saveDocument', formdata)
  
  }

  getDocuments(petId: number): Observable<PetDocument[]> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.get<PetDocument[]>(this.url + `getAllDocuments?petId=${petId}`, options);
  }
}
