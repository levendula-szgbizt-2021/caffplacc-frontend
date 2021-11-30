import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { UserResponse } from 'src/app/shared/models/admin.model';

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
  users:UserResponse[] = []

  selected?: UserResponse;

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

  onUserDelete(template:any, user: UserResponse){
    this.selected = user;
    this.modalService.open(template).result.then(async (value)=>{
      if(value == "Ok" && this.selected){
        await this.adminService.DeleteUser(this.selected.id).toPromise();
      }
    })
  }

  onUserEdit(template:any, user: UserResponse){
    this.selected = user;
    this.modalService.open(template);
    this.form.setValue({username:null, email:null, password:null, admin:false})
  }

  async submit(){
    this.submitted = true;
    if(this.selected)
      await this.adminService.UpdateUser(this.selected?.id,{
        ...this.form.value
      }).toPromise()
  }

}
