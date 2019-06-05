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

  shouldHide = true;

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
    const passwordRequirement = validPassword(password, cpassword);
    if (password !== cpassword) {
      this.presentToast('Passwords dont match');
      this.shouldHide = false;
      return console.error('Passwords dont match');
    } else if (passwordRequirement != "") {
      this.presentToast(passwordRequirement);
      this.shouldHide = false;
      return console.error('Password didn\'t meet requirements.');
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

function validPassword(password: string, cpassword: string) {

  let error = "";

  const lowercaseRegex = new RegExp("(?=.*[a-z])");// has at least one lower case letter
  if (!lowercaseRegex.test(password)) {
    error = "Password needs a lower case letter.";
  }

  const uppercaseRegex = new RegExp("(?=.*[A-Z])"); //has at least one upper case letter
  if (!uppercaseRegex.test(password)) {
    error = "Password needs an upper case letter.";
  }

  const numRegex = new RegExp("(?=.*\\d)"); // has at least one number
  if (!numRegex.test(password)) {
    error = "Password needs at least one number.";
  }

  const specialcharRegex = new RegExp("[!@#$%^&*(),.?\":{}|<>]");
  if (!specialcharRegex.test(password)) {
    error = "Password needs at least one special character.";
  }

  if (password.length < 8) {
    error = "Password needs to be at least 8 characters.";
  }

  return error;

}

