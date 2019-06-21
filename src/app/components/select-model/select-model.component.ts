import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarService } from 'src/app/services/bar/bar.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss'],
})
export class SelectModelComponent implements OnInit {

  @Input() bartenderList: User[] = [];
  selectedBartender: string;

  constructor(
    public modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss(this.selectedBartender);
  }

  selectedTest() {
    console.log(this.selectedBartender);
  }
}
