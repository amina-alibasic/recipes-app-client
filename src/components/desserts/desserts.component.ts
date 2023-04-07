import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';
import * as jsonData from '../../assets/recipes.json';


@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent {
  
  constructor(private router: Router) { }

  recipes2: any = jsonData;
  recipes = this.recipes2.recipes;
  ngOnInit() {
    console.log(this.recipes.recipes);
  }

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);
  }
}
