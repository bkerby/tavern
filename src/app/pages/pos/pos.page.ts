import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { BarService } from 'src/app/services/bar/bar.service';
import { Tab } from 'src/app/types/tab';
import { UserService } from 'src/app/services/user/user.service';

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
  tabs: Tab[];

  constructor(
    public modalController: ModalController,
    private barService: BarService) { }

  ngOnInit() {
    this.barService.initBar();
    this.barService.getTabs();
    this.tabs = this.barService.tabs;
  }

  changeQuantity(num: number) {
    if (this.quantity > 0 || num > 0) {
      this.quantity = this.quantity + (num);
    }
  }

  log(str) {
    console.log(str);
  }
}
