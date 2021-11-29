import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CaffService } from 'src/app/services/caff.service';
import { AnimationResponse } from 'src/app/shared/models/animation.model';

@Component({
  selector: 'app-caffs',
  templateUrl: './caffs.component.html',
  styleUrls: ['./caffs.component.css']
})
export class CaffsComponent implements OnInit {
  loading = false;
  caffs: Array<AnimationResponse> = [];
  constructor(    
    private router: Router,
    private route: ActivatedRoute,
    private caffService: CaffService) 
    { }

  page=0;
  totalPages=0;
  totalElements = 0;
  pageSize=20;

  async ngOnInit() {
    this.loading = true
    this.invalidate();
    this.loading = false
  }

  async previewImage(event: any, id: string){
    var url = await this.caffService.PreviewAnimation(id);
    event.target.src = url;
  }

  onPageChange(){
    this.invalidate();
  }

  async invalidate(){
    const snapshot = this.route.snapshot;
    let search = snapshot.queryParamMap.get("search") || ""
    const res = await this.caffService.GetAnimations(search,this.page-1,this.pageSize).toPromise();
    this.totalPages = res.totalPages;
    this.totalElements =res.totalElements;
    this.caffs = res.content
  }  
}
