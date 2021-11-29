import { Component, OnInit } from '@angular/core';
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
  errorMessage = "";
  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.loading = true
    this.user = await this.userService.getprofile().toPromise();
    this.loading = false
  }

}
