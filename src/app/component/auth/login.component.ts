import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  submitted = false;
  errorMessage = '';
  loginForm!: FormGroup;
  loading = false;
  valami = false;
  bejelentkezve = false;

  @Output('update') notifyParent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService
    ) { 
    }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit() {

    this.errorMessage=""
    this.loading = true;
    this.authService.login(this.loginForm.value)
            .subscribe(
                data => {
                    this.tokenService.saveToken(data.token);
                    this.authService.sendUpdate(true);
                    //teszt
                    this.valami = this.authService.loggedInSubject.value;
                    console.log("faszom")
                    console.log(this.authService.loggedInSubject.value)
                    
                },
                error => {
                    this.errorMessage = error;
                    this.loading = false;
                });
  }

  addNewValue(){
    this.notifyParent.emit(true);
  }

  
}

