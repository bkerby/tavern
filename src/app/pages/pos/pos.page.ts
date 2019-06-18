import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { SelectModelComponent } from 'src/app/components/select-model/select-model.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
})
export class PosPage implements OnInit {
  quantity = 0;
  tabSelected: string;
  bartenderSelected: string;
  itemsSelected: string[];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  changeQuantity(num: number) {
    if (this.quantity > 0 || num > 0) {
      this.quantity = this.quantity + (num);
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SelectModelComponent,
    });
    return await modal.present();
  }
}
