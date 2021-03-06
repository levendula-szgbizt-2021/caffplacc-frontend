import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JWTResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RegisterRequest } from '../shared/models/auth.model';
import { TokenService } from './token.service';

//TODO: replace with ours when its published by Ákos
const AUTH_API = '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  public loggedInSubject= new BehaviorSubject<boolean>(false);
  public userId: string = '';
  public role: string[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {

  }
  checkLogin(): void {
    const refreshToken = this.tokenService.getRefreshToken()
    if(refreshToken){
      this.getNewToken({refreshToken}).subscribe((value)=>{
          this.userId = value.userId;
          this.role = value.roles;
          this.loggedInSubject.next(true);
      })
    }
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

  getNewToken(token: RefreshTokenRequest){
    return this.http.post<JWTResponse>(AUTH_API + 'refresh', token, httpOptions);
  }

  getUserId(){
    return this.userId;
  }

  getRole(){
    return this.role;
  }

  public isAdmin(){
    return this.role.includes("ROLE_ADMIN");
  }

  logout(){
    this.tokenService.signOut();
    this.loggedInSubject.next(false);
  }
}
