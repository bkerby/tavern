import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Bar } from 'src/app/types/bar';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-remove-modal',
  templateUrl: './add-remove-modal.component.html',
  styleUrls: ['./add-remove-modal.component.scss'],
})
export class AddRemoveModalComponent implements OnInit, OnDestroy {

  bartenders: string[] = [];
  items: any[] = [];
  @Input() type = '';
  sub: Subscription;
  allBartenders: User[];

  constructor(
    public modalController: ModalController,
    private afstore: AngularFirestore,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.initUser();
    this.setAllBartenders();
    this.setBarBartenders();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  add(bid: string) {
    this.bartenders.push(bid);
    this.updateBartenders();
  }

  remove(bid: string) {
    this.bartenders.splice(this.bartenders.indexOf(bid));
    this.updateBartenders();
  }

  updateBartenders() {
    this.afstore.doc(`bars/${this.userService.getUID()}`).update({ bartenders: this.bartenders });
  }

  setAllBartenders() {
    this.sub = this.afstore.collection('users', ref => ref.where('type', '==', 'b')).valueChanges().subscribe(users => {
      this.allBartenders = users as User[];
    });
  }

  setBarBartenders() {
    this.afstore.doc(`bars/${this.userService.getUID()}`).valueChanges().subscribe(bar => {
      if ((bar as Bar).bartenders !== undefined) {
        this.bartenders = (bar as Bar).bartenders;
      }
    });
  }

  getBartenderStatus(uid: string) {
    return this.bartenders.includes(uid);
  }
}
