import { Component, OnInit } from '@angular/core';
import { BarService } from 'src/app/services/bar/bar.service';
import { Bar } from 'src/app/types/bar';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.page.html',
  styleUrls: ['./bar-admin.page.scss'],
})
export class BarAdminPage implements OnInit {

  bar: Bar = new Bar();

  constructor(
    private barService: BarService,
    private afstore: AngularFirestore) { }

  ngOnInit() {
    this.barService.initBar();
  }
}
