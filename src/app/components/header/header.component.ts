import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  goToHome() {
    const currentRoute = window.location.pathname;
    if (currentRoute !== '/home') {
      window.location.href = '/home';
    }
  }
}
