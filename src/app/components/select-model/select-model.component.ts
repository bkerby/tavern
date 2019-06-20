import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarService } from 'src/app/services/bar/bar.service';

@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss'],
})
export class SelectModelComponent implements OnInit {

  selectedBartender: string = '';

  constructor(
    private modalContoller: ModalController,
    private barService: BarService) { }

  ngOnInit() {
    this.barService.initBar();
  }

  closeModal() {
    this.modalContoller.dismiss();
  }
}
