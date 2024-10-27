import { Category } from 'src/app/classes/category';
import { Recipe } from 'src/app/classes/recipe';

export interface AppState {
  recipes: Recipe[];
  categories: Category[];
  recipesLoaded: boolean;
  recipesError: any;
}
