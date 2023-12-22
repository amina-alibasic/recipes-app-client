import { createReducer, on, Action } from "@ngrx/store";
import { Recipe } from "../../classes/recipe"; // Define the Recipe model
import * as RecipeActions from "../actions/recipes.actions";

export interface RecipesState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  loading: boolean;
  error: any;
}

export const initialState: RecipesState = {
  recipes: [],
  filteredRecipes: [],
  loading: false,
  error: null,
};

const recipesReducer = createReducer(
  initialState,
  on(RecipeActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RecipeActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
  })),
  on(RecipeActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function reducer(state: RecipesState | undefined, action: Action) {
  return recipesReducer(state, action);
}
