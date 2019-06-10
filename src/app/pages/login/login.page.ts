import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  user: User = new User();

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    public router: Router,
    public toastController: ToastController) { }

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
    const { email, password } = this;
    try {
      // kind of a hack.
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      if (res.user) {
        this.userService.setUser(this.user);
        this.router.navigate(['/home']);
      }
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
