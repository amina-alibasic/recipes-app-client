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
      switchMap(({ sortBy, sortOrder, searchValue, categoryIds, page, size }) =>
        this.recipeService
          .getAllRecipes(
            sortBy,
            sortOrder,
            searchValue,
            categoryIds,
            page,
            size
          )
          .pipe(
            map((recipes: Recipe[]) =>
              RecipeActions.loadRecipesSuccess({
                recipes: recipes,
                appendResults: page !== 0,
              })
            ),
            catchError((error) =>
              of(RecipeActions.loadRecipesFailure({ error }))
            )
          )
      )
    )
  );

  postRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.postRecipe),
      switchMap(({ recipe }) =>
        this.recipeService.postRecipe(recipe).pipe(
          map((newRecipe: Recipe) =>
            RecipeActions.postRecipeSuccess({ recipe: newRecipe })
          ),
          catchError((error) => of(RecipeActions.postRecipeFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}
}
