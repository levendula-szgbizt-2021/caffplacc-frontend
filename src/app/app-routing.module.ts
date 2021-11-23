import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/common/home.component';
import { LoginComponent } from './component/auth/login.component';
import { RegisterComponent } from './component/auth/register.component';
import { CaffsComponent } from './component/caff/caffs/caffs.component';
import { CaffDetailsComponent } from './component/caff/caff-details/caff-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'register',component: RegisterComponent},
  { path: 'caffs', component: CaffsComponent},
  { path: 'caffs/:id', component: CaffDetailsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
