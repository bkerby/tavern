import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tab',
      buttons: [{
        text: 'Open Tab',
        icon: 'beer',
        handler: () => {
          console.log('Tab Opened');
          this.router.navigate(['/home/tab']);
        }
      }, {
        text: 'Menu',
        icon: 'list-box',
        handler: () => {
          console.log('Menu opened');
          this.router.navigate(['/home/menu']);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
