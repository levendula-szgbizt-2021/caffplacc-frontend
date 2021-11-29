import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UpdateProfileRequest, UpdateProfilResponse } from '../shared/models/auth.model';
import { TokenService } from './token.service';

const TOKEN_KEY = 'auth-token-caffplacc';
const USER_URL = 'api/user/settings'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { 
  }

  updateprofile(regDto: UpdateProfileRequest): Observable<any> {
    return this.http.post(USER_URL + 'settings', regDto, {responseType:'text'});
  }

  getprofile(): Observable<UpdateProfilResponse> {
    return this.http.get<UpdateProfilResponse>(USER_URL + 'settings', httpOptions);
  }

}
