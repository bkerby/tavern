import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/types/user';
import { Bar } from 'src/app/types/bar';

@Component({
  selector: 'app-register-bus-bar',
  templateUrl: './register-bus-bar.page.html',
  styleUrls: ['./register-bus-bar.page.scss'],
})
export class RegisterBusBarPage implements OnInit, OnDestroy {

  email = '';
  password = '';
  cpassword = '';
  barSelected = '';

  shouldHide = true;
  user: User = new User();
  sub: any;
  bar: Bar = new Bar();
  bars: Bar[] = [];

  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public userService: UserService,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.user.type = 'b';
    this.getBars();
  }

  ngOnDestroy() {
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
      if (this.user.type === 'a') {
        this.user.bid = res.user.uid;
      } else {
        this.user.bid = this.barSelected;
      }

      this.afstore.doc(`users/${res.user.uid}`).set(Object.assign({}, this.user));
      this.userService.setUser(this.user);
      if (this.user.type === 'a') {
        this.bar.bid = res.user.uid;
        this.afstore.doc(`bars/${res.user.uid}`).set(Object.assign({}, this.bar));
      }
      this.router.navigate(['/home']);
    } catch (err) {
      this.presentToast(err.message);
      console.dir(err);
    }
  }

  loginNav() {
    this.router.navigate(['/login']);
  }

  registerNav() {
    this.router.navigate(['/register']);
  }

  addZero(num: number): string {
    if (num <= 9) {
      return '0' + num;
    }
    return '' + num;
  }

  async getBars() {
    await this.afstore.collection('bars').valueChanges().subscribe(bars => {
      this.bars = [];
      bars.forEach(bar => {
        this.bars.push(bar as Bar);
      });
    });
  }
}
