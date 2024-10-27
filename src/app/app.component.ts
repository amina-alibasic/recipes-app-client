import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { Store } from '@ngrx/store';
import * as RecipeActions from './store/actions/recipes.actions';
import * as CategoryActions from './store/actions/categories.actions';
import { AppState } from './store/state/recipes.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.loadCategories();
  }

  loadRecipes(): void {
    this.store.dispatch(RecipeActions.loadRecipes({}));
  }

  loadCategories(): void {
    this.store.dispatch(CategoryActions.loadCategories());
  }
}
