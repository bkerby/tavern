import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';
  cpassword: string = '';

  shouldHide = true;
  user: User = new User();
  sub: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public userService: UserService,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    // How to query a database
    // this.sub = this.afstore.collection('users', ref => ref.where('fName', '==', 'Ben')).valueChanges().subscribe(user => {
    //   console.log(user);
    // });
    this.user.type = 'c';
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  validPassword(password: string, cpassword: string) {

    let error = '';

    const lowercaseRegex = new RegExp('(?=.*[a-z])');
    if (!lowercaseRegex.test(password)) {
      error = 'Password needs a lower case letter.';
    }

    const uppercaseRegex = new RegExp('(?=.*[A-Z])');
    if (!uppercaseRegex.test(password)) {
      error = 'Password needs an upper case letter.';
    }

    const numRegex = new RegExp('(?=.*\\d)');
    if (!numRegex.test(password)) {
      error = 'Password needs at least one number.';
    }

    const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
    if (!specialcharRegex.test(password)) {
      error = 'Password needs at least one special character.';
    }

    if (password.length < 8) {
      error = 'Password needs to be at least 8 characters.';
    }

    return error;
  }

  async presentToast(err: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }

  async register() {
    const { email, password, cpassword } = this;
    // const passwordRequirement = this.validPassword(password, cpassword);
    if (password !== cpassword) {
      this.presentToast('Passwords dont match');
      this.shouldHide = false;
      return console.error('Passwords dont match');
    }
    // if (passwordRequirement !== '') {
    //   this.presentToast(passwordRequirement);
    //   this.shouldHide = false;
    //   return console.error('Password didn\'t meet requirements.');
    // }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      this.user.email = res.user.email;
      this.user.uid = res.user.uid;

      this.afstore.doc(`users/${res.user.uid}`).set(Object.assign({}, this.user));
      this.userService.setUser(this.user);
      this.router.navigate(['/home']);
    } catch (err) {
      this.presentToast(err.message);
      console.dir(err);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  addZero(num: number): string {
    if (num <= 9) {
      return '0' + num;
    }
    return '' + num;
  }
}
