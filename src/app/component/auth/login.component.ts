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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  
  errorMessage = '';
  loginForm!: FormGroup;
  loading = false;
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
                    this.authService.role = data.roles;
                    this.authService.userId = data.userId;
                    this.tokenService.saveRefreshToken(data.refreshToken);
                    this.authService.sendUpdate(true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.errorMessage = error.message;
                    this.loading = false;
                });
  }

}

