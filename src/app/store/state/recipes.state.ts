import { Recipe } from "src/app/classes/recipe";

export interface AppState {
  recipes: Recipe[];
  recipesLoaded: boolean;
  recipesError: any;
}
