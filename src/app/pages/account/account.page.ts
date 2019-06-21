import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  oldPassword = '';
  newPassword = '';
  cNewPassword = '';
  newEmail = '';

  constructor(
    public userService: UserService,
    public afauth: AngularFireAuth,
    public toastController: ToastController,
    public router: Router) { }

  ngOnInit() {
    this.userService.initUser();
  }

  logout() {
    this.userService.logout();
  }

  saveProfile() {
    if (this.oldPassword !== '') {
      this.userService.reAuth(this.afauth.auth.currentUser.email, this.oldPassword);
      if (this.newPassword === this.cNewPassword) {
        this.userService.updatePassword(this.newPassword);
        if (this.newEmail !== '') {
          this.userService.updateEmail(this.newEmail);
          this.userService.user.email = this.newEmail;
        }
      }
    }
    this.userService.updateUser();
  }

}
