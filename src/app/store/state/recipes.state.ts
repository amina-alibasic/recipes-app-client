import { Recipe } from "src/app/classes/recipe";

export const RECIPES_FEATURE_KEY = 'recipes';
export interface RecipesState {
  recipes: Recipe[];
  loaded: boolean;
  error?: string | null;
}

export const initialRecipesState: RecipesState = {
  recipes: [],
  loaded: false,
  error: null,
};