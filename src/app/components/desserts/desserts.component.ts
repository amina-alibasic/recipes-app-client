import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';
import * as jsonData from '../../../assets/recipes.json';
import { Recipe } from 'src/app/classes/recipe';


@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent {
  
  constructor(private router: Router) { }

  recipesx= jsonData;
  recipes: Recipe[] = this.recipesx.recipes;
  ngOnInit() {


  }

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);
  }
}
