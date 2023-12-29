import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shelter } from './models/Shelter';
import { Staff } from './models/Staff';

@Injectable({
  providedIn: 'root'
})
export class ShelterManagementApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8082';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = {
    headers: this.headers,
    responseType: 'json' as const,
  }

  getShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(this.url + '/Shelter/getAllShelters/1', this.options);
  }

  addShelter(shelter: Shelter): Observable<number> {
    return this.http.post<number>(this.url + '/Shelter/addShelter', JSON.stringify(shelter), this.options);
  }

  updateShelter(shelter: Shelter): Observable<boolean> {
    return this.http.put<boolean>(this.url + `/Shelter/updateShelter/${shelter.id}`, JSON.stringify(shelter), this.options);
  }

  deleteShelter(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + `/Shelter/deleteShelter/${id}`, this.options);
  }

  getShelterStaff(id: number): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.url + `/Shelter/getStaffMembers/${id}`, this.options);
  }
}
