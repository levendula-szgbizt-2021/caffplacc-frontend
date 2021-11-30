import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateProfilResponse } from 'src/app/shared/models/auth.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user!: UpdateProfilResponse;
  loading = false;
  form!: FormGroup;
  submitted = false;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService){ }

  async ngOnInit() {
    this.loading = true
    this.form = this.formBuilder.group(
      {
        username: [""],
        email: ["", Validators.email],
        password: ["", [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]],
      })
    const confirmPasswordControl = new FormControl('', [sameValueAs(this.form, 'password')]);
    this.form.addControl('password2', confirmPasswordControl)
    this.user = await this.userService.getprofile().toPromise();

      this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  async invalidate(){
    this.user = await this.userService.getprofile().toPromise();
  }

  async onDelete(){
    await this.userService.deleteprofile().toPromise();
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

  async onSubmit() {
    console.log("Mi a csöcs van")
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    try{
      await this.userService.updateprofile(this.form.value).toPromise();
      await this.invalidate();
    }
    catch(e){
      console.log(e);
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