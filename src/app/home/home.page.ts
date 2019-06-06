import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public homePages = [
    {
      title: 'Bars',
      url: 'bars',
      icon: 'beer'
    },
    {
      title: 'Legal',
      url: 'legal',
      icon: 'paper'
    },
    {
      title: 'Account',
      url: 'account',
      icon: 'person'
    }
  ];

  constructor(public router: Router) { }

  goToMenuItem(url: string) {
    this.router.navigate(['home/' + url]);
  }

}
