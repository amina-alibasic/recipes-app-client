import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})

export class RecipesListComponent {

  @Input() recipesToShow: Recipe[] = [];

  ingredientsSize(size: number): number {
    return size/4;
  }
}
