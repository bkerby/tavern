import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  cpassword: string = '';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public appRoutes: RouterModule,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }
  async presentToast(err: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }
  async register() {
    const { username, password, cpassword } = this;
    if (password !== cpassword) {
      this.presentToast('Passwords dont match');
      return console.error('Passwords dont match');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);

      // this.user.setUser({
      // 	username,
      // 	uid: res.user.uid
      // });
      this.router.navigate(['/home']);
    } catch (err) {
      this.presentToast(err.message);
      console.dir(err);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

}

