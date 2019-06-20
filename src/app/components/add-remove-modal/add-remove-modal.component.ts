import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Bar } from 'src/app/types/bar';

@Component({
  selector: 'app-add-remove-modal',
  templateUrl: './add-remove-modal.component.html',
  styleUrls: ['./add-remove-modal.component.scss'],
})
export class AddRemoveModalComponent implements OnInit, OnDestroy {

  bid = 'UGR9GcxzRix5P7qA3Yux';
  bartenders: string[] = [];
  items: any[] = [];
  @Input() type = '';
  sub: Subscription;

  constructor(
    private modalContoller: ModalController,
    private afstore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.initializeBartenders();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeModal() {
    this.modalContoller.dismiss();
  }

  add(bid: string) {
    console.log('Added User: ' + bid);
    this.bartenders.push(bid);
    this.updateBartenders();
  }

  remove(bid: string) {
    console.log('Removed User: ' + bid);
    this.bartenders.splice(this.bartenders.indexOf(bid));
    this.updateBartenders();
  }

  updateBartenders() {
    this.afstore.doc(`bars/${this.bid}`).update({ bartenders: this.bartenders });
  }

  // initialize the items with false

  initializeBartenders() {
    this.sub = this.afstore.collection('users', ref => ref.where('type', '==', 'b')).valueChanges().subscribe(users => {
      this.afstore.doc(`bars/${this.bid}`).valueChanges().subscribe(bar => {
        const b = bar as Bar;
        this.bartenders = b.bartenders;
        users.forEach(user => {
          const bartender = user as User;
          this.items.push({ user: bartender, isBartender: this.bartenders.includes(bartender.uid) });
        });
      });
    });
  }

}
