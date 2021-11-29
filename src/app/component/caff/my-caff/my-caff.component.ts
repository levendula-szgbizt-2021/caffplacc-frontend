import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaffService } from 'src/app/services/caff.service';
import { AnimationResponse } from 'src/app/shared/models/animation.model';

@Component({
  selector: 'app-my-caff',
  templateUrl: './my-caff.component.html',
  styleUrls: ['./my-caff.component.css']
})
export class MyCaffComponent implements OnInit {
  loading = false;
  caffs: Array<AnimationResponse> = [];
  
  constructor(
    private caffService: CaffService,
    private route: ActivatedRoute,
    ) {}

  page=1;

  async ngOnInit() {
    this.loading = true
    const snapshot = this.route.snapshot;
    let search = snapshot.queryParamMap.get("search") || ""
    let page = parseInt(snapshot.queryParamMap.get("page") ||"0") || 0
    const res = await this.caffService.GetAnimations(search,page).toPromise();
    this.caffs = res.content
    this.loading = false
  }

  async previewImage(event: any, id: string){
    var url = await this.caffService.PreviewAnimation(id);
    event.target.src = url;
  }

}
