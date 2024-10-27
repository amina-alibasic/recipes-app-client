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
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { selectCategories } from 'src/app/store/selectors/categories.selector';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  categories: Category[] = [];
  filteredRecipes: Recipe[] = [];
  recipesLoading$!: Observable<boolean>;
  recipesError$!: Observable<any>;
  searchForm!: FormGroup;
  selectedCategories: string[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      checkboxes: this.formBuilder.group({}),
    });
  }

  ngOnInit(): void {
    this.recipesLoading$ = this.store.pipe(select(selectRecipesLoading));
    this.recipesError$ = this.store.pipe(select(selectRecipesError));
    this.store.pipe(select(selectRecipes)).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
    this.store
      .pipe(select(selectCategories))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
    this.initializeCheckboxes();
    this.subscribeToCheckboxChanges();
  }

  initializeCheckboxes(): void {
    const checkboxGroup = this.searchForm.get('checkboxes') as FormGroup;
    this.categories.forEach((category) => {
      checkboxGroup.addControl(
        category.id.toString(),
        this.formBuilder.control(false)
      );
    });
  }

  subscribeToCheckboxChanges(): void {
    this.searchForm.valueChanges.subscribe((values) => {
      console.log('Values checkboxes: >>>>', values);
      const selectedCategoryIds = this.getSelectedCategories();
      // Call API with selected category IDs
    });
  }

  getSelectedCategories(): number[] {
    return Object.keys(this.searchForm.value)
      .filter((key) => this.searchForm.value[key])
      .map(Number);
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
            this.selectedCategories.includes(
              recipe.category.name.toLowerCase()
            ) && recipe.name.toLowerCase().includes(searchText)
        );
      }
    } else {
      // If search text is less than 3 characters, do not filter by search text, only by category (if there is any)
      if (this.selectedCategories.length !== 0) {
        this.filteredRecipes = this.recipes.filter((recipe) =>
          this.selectedCategories.includes(recipe.category.name.toLowerCase())
        );
      } else {
        // no category checked, no search text -> show all
        this.filteredRecipes = this.recipes;
      }
    }
  }
}
