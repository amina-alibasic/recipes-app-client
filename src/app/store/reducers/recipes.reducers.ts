import { createReducer, on, Action } from '@ngrx/store';
import { Recipe } from '../../classes/recipe'; // Define the Recipe model
import * as RecipeActions from '../actions/recipes.actions';

export interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: any;
}

export const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeReducer = createReducer(
  initialState,
  on(RecipeActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RecipeActions.loadRecipesSuccess, (state, { recipes, appendResults }) => ({
    ...state,
    recipes: appendResults ? [...state.recipes, ...recipes] : recipes,
    loading: false,
  })),
  on(RecipeActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function recipesReducer(
  state: RecipesState | undefined,
  action: Action
) {
  return recipeReducer(state, action);
}
