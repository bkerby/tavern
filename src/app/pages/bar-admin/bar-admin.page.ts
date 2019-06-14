import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddRemoveModalComponent } from 'src/app/components/add-remove-modal/add-remove-modal.component';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.page.html',
  styleUrls: ['./bar-admin.page.scss'],
})
export class BarAdminPage implements OnInit {

  test = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openModal(typeStr: string) {
    const modal = await this.modalController.create({
      component: AddRemoveModalComponent,
      componentProps: { type: typeStr, }
    });
    return await modal.present();
  }

}
