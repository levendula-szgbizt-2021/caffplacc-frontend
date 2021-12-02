import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreateUpdateRequest, UserListResponse } from '../shared/models/admin.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const ADMIN_API = "/api/admin"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public GetUsers(page:number=0,pageSize=20, sorted=false): Observable<UserListResponse>{
    const params = new URLSearchParams();
    params.set("page",page.toFixed(0));
    params.set("size",pageSize.toFixed(0))
    return this.http.get<UserListResponse>(ADMIN_API+"/settings?"+params.toString(),httpOptions);
  }

  public UpdateUser(id:string, request: UserCreateUpdateRequest){
    const req : UserCreateUpdateRequest = {
      email: !!request.email?request.email:null,
      username: !!request.username?request.username:null,
      password: !!request.password?request.password:null,
    }
    return this.http.put(ADMIN_API+"/settings/"+id,req,httpOptions);
  }

  public DeleteUser(id:string){
    return this.http.delete(ADMIN_API+"/settings/"+id,httpOptions);
  }

}
