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

  //isUserAuthenticated = false;
  //authSubscription!: Subscription;
  
  constructor(private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {
    //this.authService.loggedIn.subscribe(x => this.currentLoggedIn = x);
  }

  ngOnInit(): void {
    this.authService.getUpdate().subscribe(data =>
      {
        this.currentLoggedIn = data;
      })
  }

  /*ngOnDestroy(){
    this.authSubscription.unsubscribe(); // make sure to unsubscribe
  }*/
 
  logout(){
    this.authService.logout();
  }
}