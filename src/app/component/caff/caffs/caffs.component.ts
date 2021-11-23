import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CaffService } from 'src/app/services/caff.service';
import { AnimationResponse } from 'src/app/shared/models/animation.model';

@Component({
  selector: 'app-caffs',
  templateUrl: './caffs.component.html',
  styleUrls: ['./caffs.component.css'],
  providers:[CaffService]
})
export class CaffsComponent implements OnInit {
  loading = false;
  caffs: Array<AnimationResponse> = [];
  constructor(    
    private router: Router,
    private route: ActivatedRoute,
    private caffService: CaffService) 
    { }

  async ngOnInit() {
    this.loading = true
    const snapshot = this.route.snapshot;
    let search = snapshot.queryParamMap.get("search") || ""
    let page = parseInt(snapshot.queryParamMap.get("page") ||"0") || 0
    const res = await this.caffService.GetAnimations(search,page).toPromise();
    this.caffs = res.content
    this.loading = false
  }

  
}
