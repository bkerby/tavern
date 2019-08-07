import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { BarService } from 'src/app/services/bar/bar.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  bid = '';
  items: Item[] = [];
  menus: { menuName: string, items: Item[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private util: UtilitiesService,
    private barService: BarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bid = this.route.snapshot.paramMap.get('id');
    this.barService.initBarWBid(this.bid);
    this.barService.getItemsWBid(this.bid);
    this.items = this.barService.items;
    this.menus = this.barService.menus;
  }
}
