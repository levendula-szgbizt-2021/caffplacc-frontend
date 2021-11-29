import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'caffplacc-client'; 
  currentLoggedIn!: boolean;

  search =""

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUpdate().subscribe(data =>
      {
        this.currentLoggedIn = data;
      })
  }

  onSearch(){
    console.log(this.search)
    this.router.navigateByUrl("/caffs?search="+this.search);
  }

  logout(){
    this.authService.logout();
  }
}