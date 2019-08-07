import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bar } from 'src/app/types/bar';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';
import { Tab } from 'src/app/types/tab';
import { Item } from 'src/app/types/item';

@Injectable({
  providedIn: 'root'
})
export class BarService implements OnDestroy {
  bar: Bar = new Bar();
  sub: Subscription;
  bartenderList: User[] = [];
  tabs: Tab[];
  items: Item[];
  menus: { menuName: string, items: Item[] }[] = [{ menuName: '', items: [] }];

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

  initBarWBid(bid: string) {
    this.afstore.doc(`bars/${bid}`).valueChanges().subscribe(bar => {
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

  async getTabs() {
    await this.afstore.doc(`bars/${this.afAuth.auth.currentUser.uid}`).valueChanges().subscribe(bar => {
      this.setBar(bar as Bar);
      this.setBartenders((bar as Bar).bartenders);
      this.afstore.collection('tabs', ref => ref.where('bar', '==', (bar as Bar).bid)
        .where('open', '==', true)).valueChanges().subscribe(tabs => {
          this.tabs = (tabs as Tab[]);
        });
    });
  }

  async getItems() {
    await this.afstore.doc(`bars/${this.afAuth.auth.currentUser.uid}`).valueChanges().subscribe(bar => {
      this.setBar(bar as Bar);
      this.setBartenders((bar as Bar).bartenders);
      this.afstore.collection('items', ref => ref.where('bid', '==', (bar as Bar).bid)
        .orderBy('menuName', 'asc'))
        .valueChanges().subscribe(items => {
          this.items = (items as Item[]);
          this.menuParser();
        });
    });
  }

  async getItemsWBid(bid: string) {
    await this.afstore.doc(`bars/${bid}`).valueChanges().subscribe(bar => {
      this.setBar(bar as Bar);
      this.setBartenders((bar as Bar).bartenders);
      this.afstore.collection('items', ref => ref.where('bid', '==', (bar as Bar).bid)
        .orderBy('menuName', 'asc'))
        .valueChanges().subscribe(items => {
          this.items = (items as Item[]);
          this.menuParser();
        });
    });
  }

  menuParser() {
    let prevName = this.items[0].menuName;
    let i = 0;
    let j = 0;
    for (const item of this.items) {
      if (prevName === this.items[i].menuName) {
        this.menus[j].menuName = this.items[i].menuName;
        this.menus[j].items.push(item);
      } else {
        j++;
        this.menus[j] = { menuName: '', items: [] };
        this.menus[j].menuName = this.items[i].menuName;
        this.menus[j].items.push(item);
      }
      prevName = this.items[i].menuName;
      i++;
    }
  }
}
