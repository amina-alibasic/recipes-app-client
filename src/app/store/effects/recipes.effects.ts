import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from 'src/app/services/recipes.service';


@Injectable()
export class CoinsEffects {

  loadMovies$ = createEffect(()  => this.recipesService.getRecipes()
  );

  constructor(
    private actions$: Actions,
    private recipesService: RecipesService
  ) {}
}