import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';

interface user {
  email: string;
  uid: string;
}

@Injectable()
export class UserService {
  private user: user;

  constructor(private afAuth: AngularFireAuth) { }

  setUser(tempuser: user) {
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

    const tempuser = await this.afAuth.authState.pipe(first()).toPromise();

    if (tempuser) {
      this.setUser({
        email: tempuser.email,
        uid: tempuser.uid
      });

      return true;
    }
    return false;
  }

  getUID(): string {
    return this.user.uid;
  }
}
