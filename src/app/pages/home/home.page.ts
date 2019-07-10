import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/types/user';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string;
  homePages = [];
  user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService,
    private afstore: AngularFirestore,
    public auth: AngularFireAuth) { }

  ngOnInit() {
    this.afstore.doc(`users/${this.auth.auth.currentUser.uid}`).valueChanges().subscribe(user => {
      console.log(user);
      const tempUser: User = user as User;
      this.userService.setUser(tempUser);
      this.homePages = this.setHomePages(tempUser.type);
    });
  }

  setHomePages(userType: string) {
    switch (userType) {
      case 'b':
        return [
          {
            title: 'POS',
            url: 'pos',
            icon: 'desktop'
          },
          {
            title: 'Account',
            url: `account`,
            icon: 'person'
          },
          {
            title: 'Legal',
            url: 'legal',
            icon: 'paper'
          }
        ];
      case 'a':
        return [
          {
            title: 'POS',
            url: 'pos',
            icon: 'desktop'
          },
          {
            title: 'Bar Admin',
            url: 'bar-admin',
            icon: 'clipboard'
          },
          {
            title: 'Edit Menu',
            url: 'edit-menu',
            icon: 'book'
          },
          {
            title: 'Edit Item',
            url: 'edit-item',
            icon: 'pricetag'
          },
          {
            title: 'Account',
            url: `account`,
            icon: 'person'
          },
          {
            title: 'Legal',
            url: 'legal',
            icon: 'paper'
          },
        ];
      default:
        return [
          {
            title: 'Bars',
            url: 'bars',
            icon: 'beer'
          },
          {
            title: 'Account',
            url: `account`,
            icon: 'person'
          },
          {
            title: 'Legal',
            url: 'legal',
            icon: 'paper'
          }
        ];
    }
  }

  goToMenuItem(url: string) {
    this.router.navigate(['home/' + url]);
  }

}
