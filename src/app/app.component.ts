import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { Store } from '@ngrx/store';
import * as RecipeActions from './store/actions/recipes.actions';
import { AppState } from './store/state/recipes.state';
import { Recipe } from './classes/recipe';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' to return an observable
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.store.dispatch(RecipeActions.loadRecipes());

    this.recipeService
      .getRecipes()
      .pipe(
        catchError((error: Error) => {
          this.store.dispatch(RecipeActions.loadRecipesFailure({ error }));
          return of([] as Recipe[]);
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.store.dispatch(RecipeActions.loadRecipesSuccess({ recipes }));
      });
  }
}
