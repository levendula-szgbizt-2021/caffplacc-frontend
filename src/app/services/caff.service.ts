import { query } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimationDetailedResponse, AnimationListResponse, UpdateAnimationRequest } from '../shared/models/animation.model';

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
      return this.http.get<AnimationListResponse>(ANIM_API+"/search?"+params.toString(),httpOptions);
  }

  public GetMyAnimations(search:string="",page:number=1,pageSize=20, sorted=false): Observable<AnimationListResponse>{
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

  public CreateAnimation(title: string, file: File){
    var formData = new FormData();
    formData.append("file",file,);
    formData.append("title",title);
    return this.http.post("/api/anim",formData);
  }

  public async DownloadAnimation(id: string){
    var res :any = await  this.http.get("/api/anim/"+ id + "/download",{...httpOptions, responseType: 'blob' as 'json'}).toPromise()
    var anchor = document.createElement("a")
    let blob = [];
    blob.push(res);
    anchor.href = window.URL.createObjectURL(new Blob(blob, {type: "application/octet-stream"}));
    anchor.setAttribute("download",id+".caff");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  public async PreviewAnimation(id:string){
    var res :any = await  this.http.get("/api/anim/"+ id + "/preview",{...httpOptions, responseType: 'blob' as 'json'}).toPromise()
    let blob = [];
    blob.push(res);
    return window.URL.createObjectURL(new Blob(blob,{type: "image/GIF"}));
  }

  public UpdateAnimation(id:string, title:string){
    return this.http.put("/api/anim/"+id,{title:title},httpOptions);
  }

  public DeleteAnimation(id: string){
    return this.http.delete("/api/anim/"+id,httpOptions);
  }

  public AddComment(animId: string, comment:string){
    return this.http.post("/api/anim/"+animId+"/comment",{content: comment},httpOptions);
  }

  public UpdateComment(animId:string, commentId:string, content:string){
    return this.http.put("/api/anim/"+animId+"/comment/"+commentId,{content: content}, httpOptions);
  }

  public DeleteComment(animId:string, commentId: string){
    return this.http.delete("/api/anim/"+animId+"/comment/"+commentId,httpOptions);
  }

}
