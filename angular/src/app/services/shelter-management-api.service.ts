import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shelter } from '../models/Shelter';
import { Staff } from '../models/Staff';

@Injectable({
  providedIn: 'root'
})
export class ShelterManagementApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8082/Shelter/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = {
    headers: this.headers,
    responseType: 'json' as const,
  }

  getShelters(): Observable<Shelter[]> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.get<Shelter[]>(this.url + 'getAllShelters/1', options);
  }

  addShelter(shelter: Shelter): Observable<number> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.post<number>(this.url + 'addShelter', JSON.stringify(shelter), options);
  }

  updateShelter(shelter: Shelter): Observable<boolean> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.put<boolean>(this.url + `updateShelter/${shelter.id}`, JSON.stringify(shelter), options);
  }

  deleteShelter(id: number): Observable<boolean> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.delete<boolean>(this.url + `deleteShelter/${id}`, options);
  }

  getShelterStaff(id: number): Observable<Staff[]> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.get<Staff[]>(this.url + `getStaffMembers/${id}`, options);
  }

  shelterId(): Observable<number> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get<number>(this.url + 'shelterId', options);
  }
}
