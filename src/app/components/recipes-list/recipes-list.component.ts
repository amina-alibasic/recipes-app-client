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

  openRecipe(id: number) {
    const newTabUrl = `/recipe/${id}`;
    window.open(newTabUrl, '_blank');
  }

  formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';
    return formattedDate.replace(/\d+/, `${day}${suffix}`);
  }
}
