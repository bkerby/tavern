import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/types/item';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarService } from 'src/app/services/bar/bar.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  test = '';

  item: Item = new Item();

  constructor(
    public afauth: AngularFireAuth,
    public afstore: AngularFirestore,
    public barService: BarService
  ) { }

  ngOnInit() {
    this.barService.initBar();
    this.barService.getItems();
  }

  addItem() {
    this.item.bid = this.afauth.auth.currentUser.uid;
    this.item.iid = this.afstore.createId();
    this.afstore.doc(`items/${this.item.iid}`).set(Object.assign({}, this.item));
    this.item = new Item();
  }

  removeItem(iid: string) {
    this.afstore.doc(`items/${iid}`).delete();
  }

}
