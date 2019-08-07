import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tab } from 'src/app/types/tab';
import { Router, ActivatedRoute } from '@angular/router';
declare var Stripe;

@Component({
  selector: 'app-stripe',
  templateUrl: 'stripe.page.html',
  styleUrls: ['stripe.page.scss'],
})
export class StripePage implements OnInit {
  stripe = Stripe('pk_test_t5FQVpORGWw0yHRLLyoGizlu00RXxzYBfX');
  card: any;
  totalCost = 0;
  currencyIcon = '$';
  bid = '';

  constructor(
    private http: HttpClient,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.bid = this.route.snapshot.paramMap.get('bid');
    this.totalCost = parseFloat(this.route.snapshot.paramMap.get('totalCost'));
    this.setupStripe();
  }

  setupStripe() {
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event);

      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          this.makePayment(result);
        }
      });
    });
  }

  makePayment(token) {
    this.http
      .post('https://us-central1-taverndev.cloudfunctions.net/payWithStripe', {
        token: token.id, amount: this.totalCost
      })
      .subscribe(data => {
        console.log(data);
      });
    this.closeTab();
  }

  closeTab() {
    this.afstore.collection('tabs', ref => ref
      .where('bar', '==', this.bid)
      .where('user', '==', this.afauth.auth.currentUser.uid)).valueChanges().subscribe(tab => {
        this.afstore.doc(`tabs/${(tab[0] as Tab).tid}`).update({ open: false });
      });
    this.router.navigate(['home/bars']);
  }
}
