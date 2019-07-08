import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private util: UtilitiesService) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

}
