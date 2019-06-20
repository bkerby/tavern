import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddRemoveModalComponent } from 'src/app/components/add-remove-modal/add-remove-modal.component';
import { BarService } from 'src/app/services/bar/bar.service';
import { Bar } from 'src/app/types/bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.page.html',
  styleUrls: ['./bar-admin.page.scss'],
})
export class BarAdminPage implements OnInit {

  bar: Bar = new Bar();

  constructor(
    private modalController: ModalController,
    private barService: BarService,
    private afstore: AngularFirestore) { }

  ngOnInit() {
    this.barService.initBar();
  }

  async openModal(typeStr: string) {
    const modal = await this.modalController.create({
      component: AddRemoveModalComponent,
      componentProps: { type: typeStr, }
    });
    return await modal.present();
  }
}
