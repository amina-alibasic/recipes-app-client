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
import { Observable, Subscription } from 'rxjs';
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
  searchText: string = '';
  recipesLoading$!: Observable<boolean>;
  recipesError$!: Observable<any>;
  searchForm!: FormGroup;
  sortBy: 'date' | 'name' = 'date';
  sortOrder: 'ASC' | 'DESC' = 'DESC';
  private currentPage = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      selectedCategories: [[]],
    });
  }

  ngOnInit(): void {
    this.recipesLoading$ = this.store.pipe(select(selectRecipesLoading));
    this.recipesError$ = this.store.pipe(select(selectRecipesError));
    this.subscription.add(
      this.store.pipe(select(selectRecipes)).subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      })
    );

    this.subscription.add(
      this.store
        .pipe(select(selectCategories))
        .subscribe((categories: Category[]) => {
          this.categories = categories;
          this.initializeCheckboxes();
          this.subscribeToCheckboxChanges();
        })
    );
    this.setupScrollListener();
  }

  loadRecipes(): void {
    this.store.dispatch(
      RecipeActions.loadRecipes({
        categoryIds: this.selectedCategories,
        searchValue: this.searchText,
        page: this.currentPage,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      })
    );
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
      // category was selected or unselected => re-fetch regardless
      // set currentPage = 0 for new lazy loading
      this.currentPage = 0;
      this.loadRecipes();
    });
  }

  setupScrollListener(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    // Check if user has scrolled to the bottom of the page
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const offset = window.scrollY + windowHeight;
    // If the user has scrolled to the bottom, load more recipes
    if (offset >= height) {
      if (this.recipes.length % 20 === 0) {
        // previous API request returned 20 recipes, meaning there might be more in the database
        // else, all recipes are fetched
        this.currentPage++;
        this.loadRecipes();
      }
    }
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
    const textInput = event.target.value.trim().toLowerCase();
    // Start searching after user types more than 2 characters
    if (textInput.length > 2) {
      this.searchText = textInput;
      // user searching by text => every new character means new results => set the paging to 0
      this.currentPage = 0;
      this.loadRecipes();
    } else if (textInput.length == 0) {
      // when text is erased, fetch all (or by category if present)
      this.searchText = '';
      this.currentPage = 0;
      this.loadRecipes();
    }
  }

  onSortChange(sortType: 'date' | 'name') {
    this.sortBy = sortType;
    // TODO: if current page = 0, means we can sort the 20 records fetched, no need to re-fetch
    this.currentPage = 0;
    this.loadRecipes();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    // TODO: if current page = 0, means we can sort the 20 records fetched, no need to re-fetch
    this.currentPage = 0;
    this.loadRecipes();
  }

  applyCategories() {
    this.selectedCategories = this.searchForm.get('selectedCategories')?.value;
    this.currentPage = 0;
    this.loadRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up subscriptions
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }
}
