import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from 'src/app/types/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BarService } from '../bar/bar.service';

@Injectable()
export class UserService {
  user: User;
  sub: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afstore: AngularFirestore,
    private router: Router,
    private barService: BarService,
    public toastController: ToastController) { }

  setUser(tempuser: User) {
    this.user = tempuser;
  }

  updateUser() {
    this.afstore.doc(`users/${this.user.uid}`).update(Object.assign({}, this.user));
    this.presentToast('Updated Profile');
  }

  getUsername(): string {
    return this.user.email;
  }

  async reAuth(email: string, password: string) {
    try {
      await this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password));
    } catch (err) {
      this.presentToast(err);
      console.dir(err);
    }
  }

  async updatePassword(newpassword: string) {
    try {
      await this.afAuth.auth.currentUser.updatePassword(newpassword);
    } catch (err) {
      this.presentToast(err);
      console.dir(err);
    }
  }

  async updateEmail(newemail: string) {
    try {
      await this.afAuth.auth.currentUser.updateEmail(newemail);
    } catch (err) {
      this.presentToast(err);
      console.dir(err);
    }
  }

  async isAuthenticated() {
    if (this.user) { return true; }

    this.user = new User();
    const tempuser = await this.afAuth.authState.pipe(first()).toPromise();

    if (tempuser) {
      this.sub = this.afstore.doc(`users/${tempuser.uid}`).valueChanges().subscribe(user => {
        this.user = user as User;
        this.setUser(this.user);
      });

      return true;
    }
    return false;
  }

  getUID(): string {
    return this.user.uid;
  }

  getType(): string {
    return this.user.type;
  }

  getUser(): User {
    return this.user;
  }

  getBid(): string {
    return this.user.bid;
  }

  async initUser() {
    await this.afstore.doc(`users/${this.afAuth.auth.currentUser.uid}`).valueChanges().subscribe(user => {
      this.setUser(user as User);
    });
  }

  async initBartender() {
    await this.afstore.doc(`users/${this.afAuth.auth.currentUser.uid}`).valueChanges().subscribe(user => {
      this.setUser(user as User);
      this.barService.getTabsWBid(this.getBid());
      this.barService.getItemsWBid(this.getBid());
    });
  }

  async logout() {
    this.setUser(new User());
    try {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    } catch (e) {
      console.dir(e);
    }
  }

  async presentToast(err: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }
}
