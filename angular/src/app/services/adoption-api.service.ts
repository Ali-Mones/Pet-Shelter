import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdoptionApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8082/Adopt/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = {
    headers: this.headers,
    responseType: 'json' as const,
  }
}
