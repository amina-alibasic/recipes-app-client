import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent {
  @Input() recipesToShow: Recipe[] = [];

  getNumberOfCharacters(): number {
    var element = document.getElementById('title');
    if (element) {
      var width = element.offsetWidth;

      var fontSize = parseFloat(window.getComputedStyle(element).fontSize);

      // Estimate average character width based on font size and font family
      var avgCharWidth = fontSize * 0.6; // This is an approximation; adjust as needed

      // Calculate the number of characters that fit within the width
      return Math.floor(width / avgCharWidth);
    }
    return 0;
  }
}
