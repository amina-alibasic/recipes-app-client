import { RecipeActionsNames } from '../actions/recipes.actions';
import * as recipesActions from '../actions/recipes.actions';
import * as jsonData from '../../../assets/recipes.json';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Recipe } from 'src/app/classes/recipe';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class RecipesEffects {
  constructor(
    private readonly actions$: Actions,
  ) {}
  public readonly loadRecipes$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActionsNames.LoadRecipes),
      switchMap(() => of(jsonData)),
      map((data: Recipe[]) => recipesActions.LoadRecipesSuccess({ data })),
      catchError((error: string | null) =>
        of(recipesActions.LoadRecipesFailure({ error }))
      )
    );
  });
  public readonly addRecipe$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActionsNames.AddRecipe),
      map((data: any) => {
        const recipes: Recipe = data.data;
        return recipesActions.AddRecipeSuccess({ data: recipes });
      }),
      catchError((error: string | null) =>
        of(recipesActions.AddRecipeFailure({ error }))
      )
    );
  });
}