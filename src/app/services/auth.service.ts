import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../shared/models/auth.model';
import { TokenService } from './token.service';
import { map } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

//TODO: replace with ours when its published by Ákos
const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedInSubject= new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { 
    //this.loggedInSubject = new BehaviorSubject<any>(tokenService.getToken());
    //this.loggedIn = this.loggedInSubject.asObservable();
  }

  sendUpdate(message: boolean) { 
    this.loggedInSubject.next(message); 
  }

  getUpdate(): Observable<boolean> {
    return this.loggedInSubject.asObservable(); 
  }

  login(loginDto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AUTH_API + 'login', loginDto, httpOptions);
  }

  register(regDto: RegisterRequest): Observable<any> {
    return this.http.post(AUTH_API + 'register', regDto, {responseType:'text'});
  }


  logout(){
    this.tokenService.signOut();
    this.loggedInSubject.next(false);
  }
}
