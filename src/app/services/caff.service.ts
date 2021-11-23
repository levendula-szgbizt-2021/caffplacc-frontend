import { query } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimationDetailedResponse, AnimationListResponse } from '../shared/models/animation.model';

const ANIM_API = '/api/anim';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CaffService {

  constructor(private http: HttpClient) { }

  public GetAnimations(search:string="",page:number=1,pageSize=20, sorted=false): Observable<AnimationListResponse>{
      const params = new URLSearchParams();
      if(search)
       params.set("query",search);
      params.set("pageNumber",page.toFixed(0));
      params.set("pageSize",pageSize.toFixed(0))
      return this.http.get<AnimationListResponse>(ANIM_API+"?"+params.toString(),httpOptions);
  }

  public GetAnimationDetail(id:string){
    return this.http.get<AnimationDetailedResponse>(ANIM_API+"/"+id,httpOptions);
  }

}
