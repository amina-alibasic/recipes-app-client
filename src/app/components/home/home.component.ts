import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { Store, select } from '@ngrx/store';
import { selectRecipes } from '../../store/selectors/recipes.selector';
import { AppState } from 'src/app/store/state/recipes.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  selectRecipesLoading,
  selectRecipesError,
} from '../../store/selectors/recipes.selector';
import * as RecipeActions from '../../store/actions/recipes.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  recipesLoading$!: Observable<boolean>;
  recipesError$!: Observable<any>;
  checkboxes!: FormGroup;
  selectedCategories: string[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recipesLoading$ = this.store.pipe(select(selectRecipesLoading));
    this.recipesError$ = this.store.pipe(select(selectRecipesError));
    this.store.dispatch(RecipeActions.loadRecipes());
    this.store.pipe(select(selectRecipes)).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
    this.initializeForm();
    this.subscribeToCheckboxChanges();
  }

  initializeForm(): void {
    this.checkboxes = this.formBuilder.group({
      breakfasts: false,
      mainCourseMeals: false,
      desserts: false,
    });
  }
  subscribeToCheckboxChanges(): void {
    this.checkboxes.get('breakfasts')?.valueChanges.subscribe((value) => {
      this.handleCheckboxChange(value, 'breakfast');
    });

    this.checkboxes.get('mainCourseMeals')?.valueChanges.subscribe((value) => {
      this.handleCheckboxChange(value, 'main course meal');
    });

    this.checkboxes.get('desserts')?.valueChanges.subscribe((value) => {
      this.handleCheckboxChange(value, 'dessert');
    });
  }
  handleCheckboxChange(value: boolean, category: string): void {
    if (value) {
      // checkbox is checked
      this.selectedCategories.push(category);
    } else {
      // value = false, checkbox was unchecked, or it was initially unchecked, so delete it
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }

    this.updateFilteredRecipes();
  }

  updateFilteredRecipes(): void {
    if (this.selectedCategories.length === 0) {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter((recipe) =>
        this.selectedCategories.includes(recipe.category.toLowerCase())
      );
    }
  }

  goTo(link: String) {
    this.router.navigate([link]);
  }

  search(event: any): void {
    const searchText = event.target.value.trim().toLowerCase();

    // Start searching after user types more than 2 characters
    if (searchText.length > 2) {
      // First check if any of the checkboxes are checked, if so -> search only within that category, if no -> search all
      if (this.selectedCategories.length === 0) {
        this.filteredRecipes = this.recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchText)
        );
      } else {
        // if there are categories selected, filter both by name and category
        this.filteredRecipes = this.recipes.filter(
          (recipe) =>
            this.selectedCategories.includes(recipe.category.toLowerCase()) &&
            recipe.name.toLowerCase().includes(searchText)
        );
      }
    } else {
      // If search text is less than 3 characters, do not filter by search text, only by category (if there is any)
      if (this.selectedCategories.length !== 0) {
        this.filteredRecipes = this.recipes.filter((recipe) =>
          this.selectedCategories.includes(recipe.category.toLowerCase())
        );
      } else {
        // no category checked, no search text -> show all
        this.filteredRecipes = this.recipes;
      }
    }
  }
}
