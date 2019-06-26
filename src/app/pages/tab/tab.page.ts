import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tab } from 'src/app/types/tab';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeTab() {
    this.sub = this.afstore.collection('tabs', ref => ref
      .where('bar', '==', this.route.snapshot.paramMap.get('id'))
      .where('user', '==', this.afauth.auth.currentUser.uid)).valueChanges().subscribe(tab => {
        this.afstore.doc(`tabs/${(tab[0] as Tab).tid}`).update({ open: false });
      });
    this.router.navigate(['home/bars']);
  }

}
