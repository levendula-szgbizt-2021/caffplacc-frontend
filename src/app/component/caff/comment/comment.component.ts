import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AuthService } from 'src/app/services/auth.service';
import { CaffService } from 'src/app/services/caff.service';
import { CommentResponse } from 'src/app/shared/models/animation.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() animId =""
  @Input() comment?: CommentResponse;
  @Output("myChange") onChangeEvent = new EventEmitter<string>()

  edit = false;
  editStr = "";
  constructor(
   private modalService: NgbModal,
   private caffService: CaffService,
   private auth: AuthService,
  ) { }


  canEdit=false;
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.comment = changes.comment.currentValue;
    this.animId = changes.animId.currentValue;
    this.canEdit = this.comment?.userId == this.auth.getUserId() || this.auth.isAdmin();
  }

  onEditOpen(){
    this.edit = true;
    this.editStr = this.comment?.content || "";
  }

  async onEditSave(){
    console.log("editSave")
    if(this.animId && this.comment){
      try{
        await this.caffService.UpdateComment(this.animId,this.comment?.id,this.editStr).toPromise();
        this.edit = false;
        this.onChangeEvent.emit("edit");
      }
      catch(e){
        const error = e as HttpErrorResponse
        alert("Editing comment failed: "+error.message);
      }

    }
      
  }

  onDelete(content: any){
    this.modalService.open(content).result.then(async (value)=>{
      if(value == "Ok" && this.comment){
        try{
                  await this.caffService.DeleteComment(this.animId,this.comment?.id).toPromise();
        this.onChangeEvent.emit("delete")
        }
        catch(e){
          const error = e as HttpErrorResponse
          alert("Deleting comment failed: "+error.message);
        }
      }
    })
  }

  toDateFormat(str?: string){
    return dayjs(str).format("YYYY.MM.DD. HH:mm:ss")
  }
}
