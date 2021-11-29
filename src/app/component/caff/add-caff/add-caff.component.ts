import { Component, OnInit } from '@angular/core';
import { CaffService } from 'src/app/services/caff.service';

@Component({
  selector: 'app-add-caff',
  templateUrl: './add-caff.component.html',
  styleUrls: ['./add-caff.component.css']
})
export class AddCaffComponent implements OnInit {
  title = "";
  file: File | null = null;
 

  constructor(private caffService: CaffService) { }

  ngOnInit(): void {
  }

  public async onSubmit(){
    console.log("Akármi",this.title,this.file)
    if(this.file){
      console.log(typeof(this.file))
      await this.caffService.CreateAnimation(this.title,this.file).toPromise();
    }
      
  }

  handleFileInput(e: any) {
    this.file = e.target.files?.item(0) || null;
  }

}
