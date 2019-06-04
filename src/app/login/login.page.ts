import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { IonMenu, ToastController } from '@ionic/angular';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }
  async presentToast(err: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }
  async login() {
    const { username, password } = this;
    try {
      // kind of a hack.
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      // if (res.user) {
      // 	this.user.setUser({
      // 		username,
      // 		uid: res.user.uid
      // 	});
      // 	this.router.navigate(['/home']);
      // }
      this.router.navigate(['/home']);
    } catch (err) {
      this.presentToast(err.message);
      console.dir(err);
    }
  }
  register() {
    this.router.navigate(['/register']);
  }

}
