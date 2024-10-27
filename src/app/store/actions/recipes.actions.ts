import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/classes/recipe';

export const loadRecipes = createAction('[Recipes] Load Recipes');
export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);
export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: any }>()
);
