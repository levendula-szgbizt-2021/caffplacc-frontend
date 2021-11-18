import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../shared/models/auth.model';

//TODO: replace with ours when its published by Ákos
const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(regDto: RegisterRequest): Observable<any> {
    return this.http.post(AUTH_API + 'register', regDto, {responseType:'text'});
  }
}
