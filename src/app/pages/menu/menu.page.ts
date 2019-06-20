import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

}
