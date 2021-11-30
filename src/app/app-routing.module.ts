import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/common/home.component';
import { LoginComponent } from './component/auth/login.component';
import { RegisterComponent } from './component/auth/register.component';
import { CaffsComponent } from './component/caff/caffs/caffs.component';
import { CaffDetailsComponent } from './component/caff/caff-details/caff-details.component';
import { AddCaffComponent } from './component/caff/add-caff/add-caff.component';
import { MyCaffComponent } from './component/caff/my-caff/my-caff.component';
import { EditProfileComponent } from './component/auth/edit-profile.component';
import { UsersComponent } from './component/admin/users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'register',component: RegisterComponent},
  { path: 'caffs', component: CaffsComponent},
  { path:"my-caffs",component: MyCaffComponent},
  { path:'caffs/add', component: AddCaffComponent},
  { path: 'caffs/:id', component: CaffDetailsComponent},
  { path: "profile", component: EditProfileComponent},
  {path:"admin",component: UsersComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
