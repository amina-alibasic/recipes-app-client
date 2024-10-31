import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Category } from 'src/app/classes/category';
import { selectCategories } from 'src/app/store/selectors/categories.selector';
import { AppState } from 'src/app/store/state/recipes.state';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipeName: string = '';
  selectedCategory: string = '';
  recipeDetails: string = '';
  servings: number = 1;
  categories: Category[] = [];

  constructor(private router: Router, private store: Store<AppState>) {}

  @ViewChild('recipeDetailsTextarea') recipeDetailsTextarea!: ElementRef;

  ngOnInit(): void {
    this.store
      .pipe(select(selectCategories))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  onSubmit() {
    console.log('Recipe Name:', this.recipeName);
    console.log('Selected Category:', this.selectedCategory);
    console.log('Recipe Details:', this.recipeDetails);
  }

  autoResize(event: any): void {
    const textarea: HTMLTextAreaElement =
      this.recipeDetailsTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 2 + 'px';
  }

  goBack(): void {
    this.router.navigate(['..']);
  }
}
