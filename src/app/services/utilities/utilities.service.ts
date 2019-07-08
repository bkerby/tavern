import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private router: Router) { }

  goToNav(url: string) {
    this.router.navigate([url]);
  }
}
