import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public actionSheetController: ActionSheetController,
              public router: Router) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tab',
      buttons: [{
        text: 'Open Tab',
        icon: 'beer',
        handler: () => {
          console.log('Tab Opened');
          this.router.navigate(['/tab']);
        }
      }, {
        text: 'Menu',
        icon: 'list-box',
        handler: () => {
          console.log('Menu opened');
          this.router.navigate(['/menu']);
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
