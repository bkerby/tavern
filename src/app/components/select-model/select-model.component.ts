import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss'],
})
export class SelectModelComponent implements OnInit, OnDestroy {
  sub: any;

  constructor(
    private modalContoller: ModalController,
    private afstore: AngularFirestore) { }

  ngOnInit() {
    this.sub = this.afstore.collection('users', ref => ref.where('type', '==', 'b')).valueChanges().subscribe(user => {
      console.log(user);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeModal() {
    this.modalContoller.dismiss();
  }
}
