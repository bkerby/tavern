import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss'],
})
export class SelectModelComponent implements OnInit {

  constructor(private modalContoller: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalContoller.dismiss();
  }
}
