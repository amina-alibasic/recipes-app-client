import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent {
  
  constructor(private router: Router) { }

  recipes = [
    {
      title: 'Title Title Title Title',
      category: 'Category'
    },
    {
      title: 'Title TitleTitle',
      category: 'Category'
    },
    {
      title: 'Title Title',
      category: 'Category'
    },
    {
      title: 'Title',
      category: 'Category'
   
    },
    {
      title: 'Title',
      category: 'Category'
    },
    {
      title: 'Title',
      category: 'Category'

    },
    {
      title: 'Title',
      category: 'Category'
    }
  ];

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);
  }
}
