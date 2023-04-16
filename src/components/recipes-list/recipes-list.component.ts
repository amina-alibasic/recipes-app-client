import { Component, Input } from '@angular/core';
import { Recipe } from 'src/classes/recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})

export class RecipesListComponent {

  @Input() recipesToShow: Recipe[] = [];

  ingredientsSize(recipe: Recipe): number {
    return recipe.ingredients.length/4;
  }
}
