import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { BarService } from 'src/app/services/bar/bar.service';
import { Tab } from 'src/app/types/tab';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
})
export class PosPage implements OnInit {
  quantity = 0;
  tabSelected: string;
  bartenderSelected: string;
  itemsSelected: string[] = [];
  tabs: Tab[];


  constructor(
    public modalController: ModalController,
    private barService: BarService,
    public afstore: AngularFirestore
  ) { }

  ngOnInit() {
    this.barService.initBar();
    this.barService.getTabs();
    this.barService.getItems();
    this.tabs = this.barService.tabs;
  }

  changeQuantity(num: number) {
    if (this.quantity > 0 || num > 0) {
      this.quantity = this.quantity + (num);
    }
  }

  addItemsToTab() {
    this.afstore.doc(`tabs/${this.tabSelected}`).update(Object.assign({}));

  }

  addItem(iid: string) {
    this.itemsSelected.push(iid);
  }

  removeItem(iid: string, quan: number) {
    this.itemsSelected.splice(this.itemsSelected.indexOf(iid), 1);
  }

  radioSelect(event) {
    this.tabSelected = event.detail.value;
  }

  getQuantity(iid: string): number {
    let count = 0;
    this.itemsSelected.forEach((i) => (i === iid && count++));
    return count;
  }
}
