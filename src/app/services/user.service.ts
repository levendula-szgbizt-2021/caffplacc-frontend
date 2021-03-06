import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UpdateProfileRequest, UpdateProfilResponse } from '../shared/models/auth.model';
import { TokenService } from './token.service';


const USER_URL = 'api/user/'
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
    const req : UpdateProfileRequest = {
      email: !!regDto.email?regDto.email:null,
      username: !!regDto.username?regDto.username:null,
      password: !!regDto.password?regDto.password:null,
    }
    console.log("akármi");
    return this.http.post(USER_URL + 'settings', req, {responseType:'text'});
  }

  getprofile(): Observable<UpdateProfilResponse> {
    return this.http.get<UpdateProfilResponse>(USER_URL + 'settings', httpOptions);
  }

  deleteprofile() {
    return this.http.delete(USER_URL + 'settings', httpOptions);
  }

}
