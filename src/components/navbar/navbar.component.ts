import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor() {}

  navbarItems = [
    {
      link: 'home',
      title: 'HOME'
    },
    {
      link: 'desserts',
      title: 'DESSERTS'
    },
    {
      link: 'breakfasts',
      title: 'BREAKFASTS'
    },
    {
      link: 'main-course-meals',
      title: 'MAIN COURSE MEALS'
    }
  ];
  activeLink = this.navbarItems[0].link;
}
