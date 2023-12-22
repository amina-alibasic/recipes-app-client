import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipesState } from "../reducers/recipes.reducers";
import { Recipe } from "src/app/classes/recipe";

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
export const selectFilteredRecipesByName = (searchText: string) =>
  createSelector(selectRecipes, (recipes: Recipe[]) => {
    const searchLowerCase = searchText.toLowerCase();
    if (!searchText || searchLowerCase.length < 3) {
      return recipes; // If search text is empty or less than 3 characters, return all recipes
    }
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchLowerCase)
    );
  });
