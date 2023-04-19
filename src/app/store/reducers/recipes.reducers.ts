import { RecipesState, initialRecipesState } from '../state/recipes.state';
import * as recipesActions from '../actions/recipes.actions';
import { Action, createReducer, on } from '@ngrx/store';

const recipessReducer = createReducer(
  initialRecipesState,
  on(recipesActions.Init, (state: any) => ({ ...state, loaded: false, error: null })),
  on(recipesActions.LoadRecipes, (state: any) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(recipesActions.LoadRecipesSuccess, (state: any, { data }: any) => ({
    ...state,
    recipess: data,
    loaded: true,
    error: null,
  })),
  on(recipesActions.LoadRecipesFailure, (state: any, { error }: any) => ({ ...state, error })),
  on(recipesActions.AddRecipe, (state: any) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(recipesActions.AddRecipeSuccess, (state: { recipes: any; }, { data }: any) => {
    let recipess = [...state.recipes];
    recipess.push(data);
    return {
      ...state,
      recipess: recipess,
      loaded: true,
      error: null,
    };
  }),
  on(recipesActions.LoadRecipesFailure, (state: any, { error }: any) => ({ ...state, error }))
);

export function reducer(state: RecipesState | undefined, action: Action) {
  return recipessReducer(state, action);
}