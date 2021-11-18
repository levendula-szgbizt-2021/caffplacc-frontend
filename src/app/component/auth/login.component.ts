import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  //isLoggedin = false;
  submitted = false;
  errorMessage = '';
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthService,
    ) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    //amig mas nem tud tortenni
    alert(JSON.stringify(this.loginForm.value))
  }

}
