import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bar } from 'src/app/types/bar';
import { Subscription } from 'rxjs';
import { Tab } from 'src/app/types/tab';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit, OnDestroy, OnChanges {

  user: string;
  bars: any[] = [];
  sub: Subscription;
  allOpenTabList: string[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public router: Router,
    public userService: UserService,
    public afstore: AngularFirestore,
    public afauth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.userService.initUser();
    this.getTabs();
  }

  ngOnChanges() {
    this.getTabs();
  }

  getTabs() {
    this.sub = this.afstore.collection('tabs', ref => ref
      .where('open', '==', true)
      .where('user', '==', this.afauth.auth.currentUser.uid))
      .valueChanges().subscribe(tabs => {
        this.allOpenTabList = [];
        (tabs as Tab[]).forEach(tab => {
          this.allOpenTabList.push(tab.bar);
        });
        console.log(this.allOpenTabList);
        this.sub = this.afstore.collection('bars').valueChanges().subscribe(bars => {
          this.bars = [];
          bars.forEach(bar => {
            this.bars.push({ bar: bar as Bar, tabOpen: this.allOpenTabList.includes((bar as Bar).bid) });
          });
          console.log(this.bars);
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToMenu(mid: string) {
    this.router.navigate([`/home/menu/${mid}`]);
  }

  isTabOpen(bid: string): boolean {
    return this.allOpenTabList.includes(bid);
  }

  viewTab(bid: string) {
    this.router.navigate([`/home/tab/${bid}`]);
  }

  openTab(bid: string) {
    console.log(bid);
    const tempTab: Tab = new Tab();
    const tempId = this.afstore.createId();
    console.log(tempId);
    tempTab.bar = bid;
    tempTab.open = true;
    tempTab.tid = tempId;
    tempTab.user = this.userService.user.uid;
    tempTab.userFName = this.userService.user.fName;
    tempTab.userLName = this.userService.user.lName;
    tempTab.items = [];
    this.afstore.doc(`tabs/${tempId}`).set(Object.assign({}, tempTab));
  }
}
