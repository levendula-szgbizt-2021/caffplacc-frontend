import { Component, OnInit } from '@angular/core';
import { AnimationDetailedResponse, CommentResponse } from 'src/app/shared/models/animation.model';
import { CaffService } from 'src/app/services/caff.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-caff-details',
  templateUrl: './caff-details.component.html',
  styleUrls: ['./caff-details.component.css']
})
export class CaffDetailsComponent implements OnInit {

  caff?: AnimationDetailedResponse

  commentStr:string = ""

  constructor(
    private caffService: CaffService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params["id"]
    this.caff = await this.caffService.GetAnimationDetail(id).toPromise();
  }

  async onComment(){
    console.log("comment sent ",this.commentStr);
    //TODO handle this normally
  }

}
