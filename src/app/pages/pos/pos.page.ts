import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarService } from 'src/app/services/bar/bar.service';
import { Tab } from 'src/app/types/tab';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

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
  tabs: Tab[] = [];


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

  async addItemsToTab() {
    const ts = this.tabSelected;
    let i = 0;
    this.barService.tabs.forEach(t => {
      if (t.tid === this.tabSelected) {
        return;
      }
      i++;
    });
    const tempItems = this.barService.tabs[i].items;
    this.afstore.doc(`tabs/${this.tabSelected}`).update({
      items: tempItems.concat(this.itemsSelected)
    });
    this.reset();
  }

  reset() {
    this.itemsSelected = [];
    this.tabSelected = null;
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
