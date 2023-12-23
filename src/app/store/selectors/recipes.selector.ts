import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipesState } from "../reducers/recipes.reducers";

export const selectRecipesState =
  createFeatureSelector<RecipesState>("recipes");

export const selectRecipes = createSelector(
  selectRecipesState,
  (state) => state.recipes
);
export const selectRecipesLoading = createSelector(
  selectRecipesState,
  (state) => state.loading
);
export const selectRecipesError = createSelector(
  selectRecipesState,
  (state) => state.error
);
