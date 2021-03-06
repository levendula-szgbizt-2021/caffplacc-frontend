import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  submitted = false;
  errorMessage = '';
  registerform!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    ) { }

  get f() {
    return this.registerform.controls;
  }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      username: ['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]],
    })
    const confirmPasswordControl = new FormControl('', [sameValueAs(this.registerform, 'password')]);

    this.registerform.addControl('password2', confirmPasswordControl)
  }

  async onSubmit() {
    if (this.registerform.invalid) {
      return;
    }
    this.errorMessage=""
    try{
      this.loading = true;
      const ret = await this.authService.register(this.registerform.value).toPromise();
      this.router.navigateByUrl("/login")
      this.loading=false;
    }
   catch(e: any){
      const error = e as HttpErrorResponse
      this.errorMessage = error.message
   }
    
  }
}
export function sameValueAs(group: FormGroup, controlName: string): ValidatorFn {
  return (control: AbstractControl) => {
        const myValue = control.value;
        const compareValue = group.controls[controlName].value;

        return (myValue === compareValue) ? null : {valueDifferentFrom:controlName};

  };
}
