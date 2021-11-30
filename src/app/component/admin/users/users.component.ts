import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { AdminUserResponse } from 'src/app/shared/models/admin.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    public modalService: NgbModal
    ) { }

  loading=true;
  users:AdminUserResponse[] = []

  selected?: AdminUserResponse;

  submitted = false;
  form: FormGroup = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null,Validators.email),
    password: new FormControl(null,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")),
    admin: new FormControl(),
  })

  get f() {
    return this.form.controls;
  }

  page=1;
  totalPages=0;
  totalElements = 0;
  pageSize=20;

  async ngOnInit() {
    this.loading = true
    this.route.queryParamMap.subscribe(map =>{
      this.page = parseInt(map.get("page")|| '1')
      this.invalidate();
    })
    this.loading = false
  }

  onPageChange(){
    const query : Params = {page:this.page}
    this.router.navigate([],    {
      relativeTo: this.route,
      queryParams: query, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    })
  }

  async invalidate(){
    const res = await this.adminService.GetUsers(this.page-1,this.pageSize).toPromise();
    this.totalPages = res.totalPages;
    this.totalElements =res.totalElements;
    this.users = res.content
  }

  onUserDelete(template:any, user: AdminUserResponse){
    this.selected = user;
    this.modalService.open(template).result.then(async (value)=>{
      if(value == "Ok" && this.selected){
        try{
          await this.adminService.DeleteUser(this.selected.id).toPromise();
          await this.invalidate();
        }
        catch(e: any){
          const error = e as HttpErrorResponse
          alert("Delete failed: "+error.message);
       }
      }
    })
  }

  onUserEdit(template:any, user: AdminUserResponse){
    this.selected = user;
    this.modalService.open(template);
    this.form.setValue({username:null, email:null, password:null, admin:user.admin})
  }

  async submit(){
    console.log(this.form.value);
    this.submitted = true;
    if(this.selected){
      try{
        await this.adminService.UpdateUser(this.selected?.id,{
          ...this.form.value
        }).toPromise()
        await this.invalidate();
      }
      catch(e: any){
        const error = e as HttpErrorResponse
        alert("Delete failed: "+error.message);
     }
    }

  }

}
