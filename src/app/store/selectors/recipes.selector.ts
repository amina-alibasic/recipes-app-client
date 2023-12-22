import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipesState } from "../reducers/recipes.reducers";

export const selectRecipesState =
  createFeatureSelector<RecipesState>("recipes");
// Create a feature selector to get the filtered recipes state from the app state
export const selectFilteredRecipesState =
  createFeatureSelector<RecipesState>("filteredRecipes");

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
