import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { Store, select } from '@ngrx/store';
import { selectRecipes } from '../../store/selectors/recipes.selector';
import { AppState } from 'src/app/store/state/recipes.state';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  selectRecipesLoading,
  selectRecipesError,
} from '../../store/selectors/recipes.selector';
import * as RecipeActions from '../../store/actions/recipes.actions';
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
  selectedCategories: number[] = [];
  filteredRecipes: Recipe[] = [];
  recipesLoading$!: Observable<boolean>;
  recipesError$!: Observable<any>;
  searchForm!: FormGroup;

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
        this.initializeCheckboxes();
        this.subscribeToCheckboxChanges();
      });
  }

  initializeCheckboxes(): void {
    const checkboxesControls = this.categories.reduce(
      (acc: { [key: string]: boolean }, category) => {
        acc[category.id] = false;
        return acc;
      },
      {}
    );
    this.searchForm.setControl(
      'checkboxes',
      this.formBuilder.group(checkboxesControls)
    );
  }

  subscribeToCheckboxChanges(): void {
    const checkboxesValue = this.searchForm.get('checkboxes');
    checkboxesValue?.valueChanges.subscribe((values) => {
      this.selectedCategories = this.getSelectedCategories(values);
      if (this.selectedCategories.length > 0) {
        console.log(this.selectedCategories);
        this.store.dispatch(
          RecipeActions.loadRecipes({
            categoryIds: this.selectedCategories,
          })
        );
      } else {
        this.store.dispatch(RecipeActions.loadRecipes({}));
      }
    });
  }

  getSelectedCategories(values: any): number[] {
    return Object.keys(values)
      .filter((key) => values[key])
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
        RecipeActions.loadRecipes({
          searchValue: searchText,
        });
      } else {
        // if there are categories selected, filter both by name and category
        RecipeActions.loadRecipes({
          categoryIds: this.selectedCategories,
          searchValue: searchText,
        });
      }
    } else {
      // If search text is less than 3 characters, do not filter by search text, only by category (if there is any)
      if (this.selectedCategories.length !== 0) {
        RecipeActions.loadRecipes({
          categoryIds: this.selectedCategories,
        });
      } else {
        // no category checked, no search text -> show all
        RecipeActions.loadRecipes({});
      }
    }
  }
}
