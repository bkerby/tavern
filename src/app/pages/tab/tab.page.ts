import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tab } from 'src/app/types/tab';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/types/item';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
declare let paypal: any;


@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit, OnDestroy, AfterViewChecked {
  sub: Subscription = new Subscription();
  bid: string;
  tid: string;
  items: Item[] = [];
  tip = 20;
  totalCost = 0;
  itemsSelected: string[] = [];
  paypalConfig: any;
  addScript = false;
  paypalLoad = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private utils: UtilitiesService
  ) { }

  ngOnInit() {
    this.bid = this.route.snapshot.paramMap.get('id');
    this.initTabItems();
    this.paypalConfig = {
      style: {
        color: 'blue',
        shape: 'pill',
        label: 'pay',
        height: 40
      },
      env: 'sandbox',
      client: {
        sandbox: 'ATGlnUxyF58-fRgnqo7LvDaYkMYMjgueumgMwG0iei1Y8xcVe_E0KCWYeAczjWLwZ0sgwz4IPN8DVRp8',
        production: '<your-production-key here>'
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: (this.totalCost + this.getTipAmount()).toFixed(2), currency: 'USD' } }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          this.utils.presentToast('Transaction was Completed');
          this.closeTab();
        });
      },
      onError: (err) => {
        console.dir(err);
        this.utils.presentToast('Error: Transaction not completed');
      }
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  splitTab(): boolean {
    return true;
  }

  async initTabItems() {
    await this.afstore.collection('tabs', ref => ref
      .where('bar', '==', this.bid)
      .where('user', '==', this.afauth.auth.currentUser.uid)
      .where('open', '==', true)).valueChanges().subscribe(tab => {
        this.items = [];
        this.totalCost = 0;
        if (tab[0]) {
          this.tid = (tab[0] as Tab).tid;
          this.itemsSelected = (tab[0] as Tab).items;
          this.itemsSelected.forEach((item) => {
            this.afstore.doc(`items/${item}`).valueChanges().subscribe((i) => {
              const tempItem = i as Item;
              this.totalCost = this.totalCost + tempItem.value;
              this.items.push(tempItem);
            });
          });
        }
      });
  }

  ngAfterViewChecked(): void {
    if (!this.addScript && this.totalCost > 0) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  async closeTab() {
    await this.afstore.collection('tabs', ref => ref
      .where('bar', '==', this.bid)
      .where('user', '==', this.afauth.auth.currentUser.uid)
      .where('open', '==', true)).valueChanges().subscribe(tab => {
        if (tab[0]) {
          this.afstore.doc(`tabs/${(tab[0] as Tab).tid}`).update({ open: false });
        }
      });
    this.router.navigate(['home/bars']);
  }

  getTipAmount(): number {
    return this.totalCost * (this.tip / 100);
  }
}
