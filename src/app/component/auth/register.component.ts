import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  errorMessage = '';
  registerform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  get f() {
    return this.registerform.controls;
  }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      username: ['', Validators.required],
      email:['',Validators.required],
      password: ['', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]],
    })
    const confirmPasswordControl = new FormControl('', [sameValueAs(this.registerform, 'password')]);

    this.registerform.addControl('password2', confirmPasswordControl)
  }

  onSubmit(): void {
    if (this.registerform.invalid) {
      return;
    }
    //amig mas nem tud tortenni
    alert(JSON.stringify(this.registerform.value))
  }
}
export function sameValueAs(group: FormGroup, controlName: string): ValidatorFn {
  return (control: AbstractControl) => {
        const myValue = control.value;
        const compareValue = group.controls[controlName].value;

        return (myValue === compareValue) ? null : {valueDifferentFrom:controlName};

  };
}
