import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  iid: string;
  item: Item = new Item();

  constructor(
    private afstore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.iid = this.route.snapshot.paramMap.get('id');
    this.afstore.doc(`items/${this.iid}`).valueChanges().subscribe(i => {
      this.item = i as Item;
    });
  }

}
