import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginNav() {
    this.router.navigate(['/login']);
  }

  registerNav() {
    this.router.navigate(['/register']);
  }

  registerBusBarNav() {
    this.router.navigate(['/register-bus-bar']);
  }

}
