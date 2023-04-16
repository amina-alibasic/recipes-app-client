import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})

export class ListComponent {

  @Input() recipesToShow: Recipe[] = [];

  ingredientsSize(recipe: Recipe): number {
    return recipe.ingredients.length/4;
  }
}

export class Recipe {
  title: string = '';
  category: string = '';
  ingredients: string[] = [];
  preparation: string = '';
}