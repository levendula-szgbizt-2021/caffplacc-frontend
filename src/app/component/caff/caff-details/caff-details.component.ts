import { Component, OnInit } from '@angular/core';
import { AnimationDetailedResponse, CommentResponse } from 'src/app/shared/models/animation.model';
import { CaffService } from 'src/app/services/caff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-caff-details',
  templateUrl: './caff-details.component.html',
  styleUrls: ['./caff-details.component.css']
})
export class CaffDetailsComponent implements OnInit {

  caff?: AnimationDetailedResponse

  commentStr:string = ""
  id ="";

  edit=false;
  editStr="";

  canEdit = false;


  constructor(
    private caffService: CaffService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private auth: AuthService,
    ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params["id"]
    this.id = id;
    await this.invalidate();
  }


  async onComment(){
    await this.caffService.AddComment(this.id,this.commentStr).toPromise();
    await this.invalidate();
  }

  async onDownload(){
    await this.caffService.DownloadAnimation(this.id)
  }

  onEdit(){
    this.edit = true;
    this.editStr=this.caff?.title || "";
  }

  async invalidate(){
    this.caff = await this.caffService.GetAnimationDetail(this.id).toPromise();
    this.canEdit = this.caff.userId == this.auth.getUserId() || this.auth.isAdmin();
  }

  async onTitleSave(){
    try{
      await this.caffService.UpdateAnimation(this.id,this.editStr).toPromise();
      await this.invalidate();
      this.edit = false;
    }
    catch(e){
        const error = e as HttpErrorResponse
        alert("Editing title failed: "+error.message);
    }
  }

  onDelete(content:any){
    this.modalService.open(content).result.then(async (value)=>{
      if(value == "Ok"){
        try{
          await this.caffService.DeleteAnimation(this.id).toPromise();
          this.router.navigateByUrl("/my-caffs");
        }
        catch(e){
          const error = e as HttpErrorResponse
          alert("Deleting caff failed: "+error.message);
        }
      }
    })
  }

  async previewImage(event: any, id: string){
    var url = await this.caffService.PreviewAnimation(id);
    event.target.src = url;
  }

  toDateFormat(str?: string){
    return dayjs(str).format("YYYY.MM.DD. HH:mm:ss")
  }

}
