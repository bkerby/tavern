import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.page.html',
  styleUrls: ['./redirect.page.scss'],
})
export class RedirectPage implements OnInit {

  constructor(
    private router: Router,
    private afstore: AngularFirestore,
    private auth: AngularFireAuth,
    private userService: UserService) { }

  ngOnInit() {
    this.afstore.doc(`users/${this.auth.auth.currentUser.uid}`).valueChanges().subscribe(user => {
      const tempUser: User = user as User;
      this.userService.setUser(tempUser);
      this.onLoadRoute(tempUser.type);
    });
  }

  onLoadRoute(type: string) {
    if (type === 'c') {
      this.router.navigate(['/home/bars']);
    } else {
      this.router.navigate(['/home/pos']);
    }
  }

}
