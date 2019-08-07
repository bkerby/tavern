import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tab } from 'src/app/types/tab';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/types/item';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { HttpClient } from '@angular/common/http';
declare var Stripe;

interface Tip {
  bartender: string;
  drinksServed: number;
  tipTotal: number;
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  bid: string;
  tid: string;
  items: Item[] = [];
  totalCost = 0;
  itemsSelected: string[] = [];

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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeTab() {
    this.router.navigate([`home/stripe-web/${this.bid}/${this.totalCost}`]);
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

  totalCostFormater(tc: number): number {
    return parseFloat('' + (Math.round(tc * 100) / 100).toFixed(2));
  }
}
