import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/classes/recipe';

export const loadRecipes = createAction(
  '[Recipes] Load Recipes',
  props<{
    sortBy?: string;
    sortOrder?: string;
    searchValue?: string;
    categoryIds?: number[];
    page?: number;
    size?: number;
  }>()
);

export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: Recipe[]; appendResults: boolean }>()
);

export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: any }>()
);

export const postRecipe = createAction(
  '[Recipes] Post Recipe',
  props<{ recipe: Recipe }>()
);

export const postRecipeSuccess = createAction(
  '[Recipes] Post Recipe Success',
  props<{ recipe: Recipe }>()
);

export const postRecipeFailure = createAction(
  '[Recipes] Post Recipe Failure',
  props<{ error: any }>()
);

export const deleteRecipe = createAction(
  '[Recipes] Delete Recipe',
  props<{ id: number }>()
);

export const deleteRecipeSuccess = createAction(
  '[Recipes] Delete Recipe Success',
  props<{ id: number }>()
);

export const deleteRecipeFailure = createAction(
  '[Recipes] Delete Recipe Failure',
  props<{ error: any }>()
);
