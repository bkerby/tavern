import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { SelectModelComponent } from 'src/app/components/select-model/select-model.component';
import { User } from 'src/app/types/user';
import { BarService } from 'src/app/services/bar/bar.service';

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

  constructor(
    public modalController: ModalController,
    private barService: BarService) { }

  ngOnInit() {
    this.barService.initBar();
  }

  changeQuantity(num: number) {
    if (this.quantity > 0 || num > 0) {
      this.quantity = this.quantity + (num);
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SelectModelComponent,
      componentProps: { bartenderList: this.barService.bartenderList },
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        const user = data.data.result;
        console.log(user);
      });

    await modal.present();
  }

  log(str) {
    console.log(str);
  }
}
