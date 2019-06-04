import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('#sideMenu') sideMenu: IonMenu;
  username: string = '';
  password: string = '';

  constructor(public afAuth: AngularFireAuth,
    public router: Router) { }

  ngOnInit() {
    this.sideMenu.close();
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
      console.dir(err);
    }
  }
  register() {
    this.router.navigate(['/register']);
  }

}
