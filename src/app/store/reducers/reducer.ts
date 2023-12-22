import { ActionReducerMap } from "@ngrx/store";
import * as fromRecipes from "./recipes.reducers"; // Import the recipes reducer
// Import other reducers if present

export interface AppState {
  recipes: fromRecipes.RecipesState; // Define the structure for recipes state
  // Define other feature states if present
}

export const reducers: ActionReducerMap<AppState> = {
  recipes: fromRecipes.reducer, // Assign the recipes reducer to the 'recipes' feature state
  // Assign other reducers to their respective feature states if present
};
