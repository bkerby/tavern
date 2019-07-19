import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var Stripe;

@Component({
  selector: 'app-stripe',
  templateUrl: 'stripe.page.html',
  styleUrls: ['stripe.page.scss'],
})
export class StripePage implements OnInit {
  stripe = Stripe('pk_test_t5FQVpORGWw0yHRLLyoGizlu00RXxzYBfX');
  card: any;
  totalCost = 100;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
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
    console.log(this.card);
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
      console.log(event)

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
  }

}
