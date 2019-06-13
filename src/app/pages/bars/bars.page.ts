import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/types/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit {
  user: string;
  quantity: number = 0;
  constructor(
    public actionSheetController: ActionSheetController,
    public router: Router,
    public userService: UserService,
    public afstore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.user = JSON.stringify(this.userService.getUser());
  }

  test() {
    this.user = JSON.stringify(this.userService.getUser());
  }
  changeQuantity(num: number) {
    this.quantity = this.quantity + (num)
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
