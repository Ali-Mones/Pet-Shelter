import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Shelter } from './models/Shelter';

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
    return this.http.get<Shelter[]>(this.url, this.options);
  }

  addShelter(shelter: Shelter): Observable<boolean> {
    return this.http.post<boolean>(this.url, shelter, this.options);
  }
}
