import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/types/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  email = '';
  password = '';
  user: User = new User();
  sub: any;

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    public router: Router,
    public toastController: ToastController,
    public afstore: AngularFirestore) { }

  ngOnInit() {
    if (this.afAuth.auth.currentUser) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.sub = this.afstore.doc(`users/${res.user.uid}`).valueChanges().subscribe(user => {
        this.userService.setUser(user as User);
      });
      this.router.navigate(['/home']);
    } catch (err) {
      this.presentToast(err.message);
      console.dir(err);
    }
  }

  registerNav() {
    this.router.navigate(['/register']);
  }

  registerBusBarNav() {
    this.router.navigate(['/register-bus-bar']);
  }

}
