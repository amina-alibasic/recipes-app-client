import { State, createFeatureSelector, createSelector} from '@ngrx/store';
import { RecipesState, RECIPES_FEATURE_KEY } from '../state/recipes.state';

export const getRecipessState = createFeatureSelector<RecipesState>(RECIPES_FEATURE_KEY);

export const getRecipesLoaded = createSelector(
  getRecipessState,
  (state: RecipesState) => state.loaded
);

export const getRecipesError = createSelector(
  getRecipessState,
  (state: RecipesState) => state.error
);

export const getAllRecipes = createSelector(
  getRecipessState,
  (state: RecipesState) => state.recipes
);