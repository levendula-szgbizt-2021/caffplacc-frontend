import { Component, OnInit } from '@angular/core';
import { CaffResponse } from 'src/app/shared/models/animation.model';

@Component({
  selector: 'app-caffs',
  templateUrl: './caffs.component.html',
  styleUrls: ['./caffs.component.css']
})
export class CaffsComponent implements OnInit {

  caffs: Array<CaffResponse> = [];
  constructor() { }

  ngOnInit(): void {
  }

  
}
