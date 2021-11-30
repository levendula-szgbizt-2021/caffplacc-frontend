import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaffService } from 'src/app/services/caff.service';

@Component({
  selector: 'app-add-caff',
  templateUrl: './add-caff.component.html',
  styleUrls: ['./add-caff.component.css']
})
export class AddCaffComponent implements OnInit {
  title = "";
  file: File | null = null;
  loading = false;
 

  constructor(private caffService: CaffService, private router: Router) {
   }

  ngOnInit(): void {
  }

  public async onSubmit(){
    if(this.file){
      try{
        this.loading = true;
        await this.caffService.CreateAnimation(this.title,this.file).toPromise();
        this.loading = false;
        this.router.navigate(["my-caffs"]);
      }
      catch(e : any){
        alert("Error happened during the upload: "+e.message);
        this.loading = false;
      }
    }
      
  }

  handleFileInput(e: any) {
    this.file = e.target.files?.item(0) || null;
  }

}
