import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../models/Filter';
import { Pet } from '../models/Pet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetApiService {

  url = 'http://localhost:8082/Pet/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = {
    headers: this.headers,
    responseType: 'json' as const,
  }

  constructor(private http: HttpClient) { }

  filterPets(filter: Filter | null, pageIndex: number, pageSize: number): Observable<Pet[]> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, params: { pageIndex: pageIndex.toString(), pageSize: pageSize.toString() }, headers: headers };
    return this.http.post<Pet[]>(this.url + 'filterPets', JSON.stringify(filter), options);
  }

  getFilterableData(): Observable<Filter> {
    const token = document.cookie.split("=")[1];
    const headers: HeadersInit = { "Authorization": `Bearer ${token}` };
    const options = { ...this.options, headers: headers };
    return this.http.get<Filter>(this.url + 'getFilterAbleData', options);
  }
}
