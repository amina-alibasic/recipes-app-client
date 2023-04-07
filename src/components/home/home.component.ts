import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonClass } from '../footer/footer.component';
import * as jsonData from '../../assets/recipes.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private router: Router) { }
  
  categories: ButtonClass[] = [
    { title: 'BREAKFAST',
      link: '/breakfast'
    },
    {
      title: 'MAIN COURSE MEAL',
      link: '/main-course-meals'
    },
    {
      title: 'DESSERT',
      link: '/desserts'
    }
  ];


  goTo(link: String) {
    this.router.navigate([link]);
  }
}

export const recipes: any = jsonData;

export const buttonsToShow: ButtonClass[] = [
  {
    title: 'HOME',
    link: '/home'
  },
  { title: 'BREAKFAST',
    link: '/breakfast'
  },
  {
    title: 'MAIN COURSE MEAL',
    link: '/main-course-meals'
  },
  {
    title: 'DESSERT',
    link: '/desserts'
  }
];