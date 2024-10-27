import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RecipeService } from '../../services/recipe.service';
import * as RecipeActions from '../actions/recipes.actions';
import { Recipe } from 'src/app/classes/recipe';

@Injectable()
export class RecipeEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipes),
      switchMap(() =>
        this.recipeService.getAllRecipes().pipe(
          map((recipes: Recipe[]) =>
            RecipeActions.loadRecipesSuccess({ recipes })
          ),
          catchError((error) => of(RecipeActions.loadRecipesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}
}
