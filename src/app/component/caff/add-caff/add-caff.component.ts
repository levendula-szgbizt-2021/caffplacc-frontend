import { Component, OnInit } from '@angular/core';
import { CaffService } from 'src/app/services/caff.service';

@Component({
  selector: 'app-add-caff',
  templateUrl: './add-caff.component.html',
  styleUrls: ['./add-caff.component.css']
})
export class AddCaffComponent implements OnInit {
  title = "";
  file?: File;
 

  constructor(private caffService: CaffService) { }

  ngOnInit(): void {
  }

  public onSubmit(){
    if(this.file)
      this.caffService.CreateAnimation(this.title,this.file);
  }

}
