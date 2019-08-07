import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private router: Router,
    private toastController: ToastController) { }

  goToNav(url: string) {
    this.router.navigate([url]);
  }

  goToItemPage(iid: string) {
    this.router.navigate(['/home/item/' + iid]);
  }

  async presentToast(err: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }
}
