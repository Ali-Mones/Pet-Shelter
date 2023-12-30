import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../models/Filter';
import { Pet } from '../models/Pet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { SignupRequest } from '../models/SignupRequest';
import { SignupResponse } from '../models/SignupResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  url = 'http://localhost:8082/auth/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = {
    headers: this.headers,
    responseType: 'json' as const,
  }

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'login', JSON.stringify(request), this.options);
  }

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.url + 'signUp', JSON.stringify(request), this.options);
  }
}
