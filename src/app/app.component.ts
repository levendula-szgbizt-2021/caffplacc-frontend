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
  isAdmin:boolean = false;

  search =""

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.authService.getUpdate().subscribe(data =>
      {
        this.currentLoggedIn = data;
        this.isAdmin = this.authService.isAdmin();
      })
  }


  onSearch(){
    this.router.navigateByUrl("caffs?search="+this.search);
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.authService.logout();
  }
}