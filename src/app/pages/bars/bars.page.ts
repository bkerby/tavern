import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bar } from 'src/app/types/bar';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit {

  user: string;
  quantity: number = 0;
  bars: any[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public router: Router,
    public userService: UserService,
    public afstore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.user = JSON.stringify(this.userService.getUser());
    this.bars.push({ bar: new Bar(), tabOpen: false });
    this.bars[0].bar.admins = ['fhjsklhfjkaslhfjklashf'];
    this.bars[0].bar.name = 'Test Bar';
    this.bars[0].bar.bid = 'fjljkalsfjaskl;fjaskl;fja';
    this.bars[0].bar.menus = ['fjsakljfksalfjsakl;fjaskl;'];
    this.bars[0].bar.bartenders = ['jfklsaklfajskfl;asjfklas'];
    this.bars[0].bar.address = 'Omaha, Ne';
    this.bars[0].bar.description = 'This is a description...';
    this.afstore.collection('bars').valueChanges().subscribe(bars => {
      bars.forEach(bar => {
        this.bars.push({ bar: bar as Bar, tabOpen: false });
      });
    });
  }

  test() {
    this.user = JSON.stringify(this.userService.getUser());
  }



  toggleTabStatus(element: HTMLButtonElement) {
    const button = element;
    this.bars[0].tabOpen = !this.bars[0].tabOpen;
    button.textContent = this.bars[0].tabOpen ? 'View Tab' : 'Open Tab';
  }

  goToMenu(mid: string) {
    this.router.navigate([`/home/menu/${mid}`]);
  }

}
