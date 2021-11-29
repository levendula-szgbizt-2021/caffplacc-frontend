import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/common/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/auth/login.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { RegisterComponent } from './component/auth/register.component';
import { CaffsComponent } from './component/caff/caffs/caffs.component';
import { CaffDetailsComponent } from './component/caff/caff-details/caff-details.component';
import { AddCaffComponent } from './component/caff/add-caff/add-caff.component';
import { EditProfileComponent } from './component/auth/edit-profile.component';
import { MyCaffComponent } from './component/caff/my-caff/my-caff.component';
import { CommentComponent } from './component/caff/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CaffsComponent,
    CaffDetailsComponent,
    AddCaffComponent,
    EditProfileComponent,
    MyCaffComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent, HomeComponent,CaffsComponent,CaffDetailsComponent,EditProfileComponent]
})
export class AppModule { }

