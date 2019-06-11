import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from 'src/app/types/user';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private user: User;
  sub: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afstore: AngularFirestore,
    private router: Router) { }

  setUser(tempuser: User) {
    this.user = tempuser;
  }

  getUsername(): string {
    return this.user.email;
  }

  reAuth(email: string, password: string) {
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password));
  }

  updatePassword(newpassword: string) {
    return this.afAuth.auth.currentUser.updatePassword(newpassword);
  }

  updateEmail(newemail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newemail);
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

  getUser(): User {
    return this.user;
  }

  async logout() {
    this.setUser(undefined);
    try {
      await firebase.auth().signOut();
      this.router.navigate(['/login']);
    } catch (e) {
      console.dir(e);
    }
  }
}
