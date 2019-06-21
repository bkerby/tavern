import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bar } from 'src/app/types/bar';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarService implements OnDestroy {
  bar: Bar = new Bar();
  sub: Subscription;
  bartenderList: User[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afstore: AngularFirestore) { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setBar(tempBar: Bar) {
    this.bar = tempBar;
  }

  getBar(): Bar {
    return this.bar;
  }

  initBar() {
    this.afstore.doc(`bars/${this.afAuth.auth.currentUser.uid}`).valueChanges().subscribe(bar => {
      this.setBar(bar as Bar);
      this.setBartenders((bar as Bar).bartenders);
    });
  }

  updateBar() {
    this.afstore.doc(`bars/${this.bar.bid}`).update(Object.assign({}, this.bar));
  }

  setBartenders(bartenders: string[]) {
    if (this.bar.bartenders !== undefined) {
      this.bar.bartenders.forEach(bartender => {
        this.afstore.doc(`users/${bartender}`).valueChanges().subscribe(b => {
          this.bartenderList.push(b as User);
        });
      });
    }
  }
}
