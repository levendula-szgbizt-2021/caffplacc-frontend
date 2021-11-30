import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router,
    ) {}



    search = "";
    page=1;
    totalPages=0;
    totalElements = 0;
    pageSize=20;
  
    async ngOnInit() {
      this.loading = true
      this.route.queryParamMap.subscribe(map =>{
        this.search = map.get("search") || ""
        this.page = parseInt(map.get("page")|| '1')
        this.invalidate();
      })
      this.loading = false
    }
  
    async previewImage(event: any, id: string){
      var url = await this.caffService.PreviewAnimation(id);
      event.target.src = url;
    }
  
    onPageChange(){
      const query : Params = {search: this.search, page:this.page}
      this.router.navigate([],    {
        relativeTo: this.route,
        queryParams: query, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      })
    }
  
    async invalidate(){
      const res = await this.caffService.GetMyAnimations(this.search,this.page-1,this.pageSize).toPromise();
      this.totalPages = res.totalPages;
      this.totalElements =res.totalElements;
      this.caffs = res.content
    }  

}
