import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/classes/recipe";

export enum RecipeActionsNames {
    Init = '[Recipe] Init',
    LoadRecipes = '[Recipe] Load Recipes',
    LoadRecipesSuccess = '[Recipe] Load Recipes Success',
    LoadRecipesFailure = '[Recipe] Load Recipes Failure',
    GetRandomRecipe = '[Recipe] Get Random Recipe',
    GetRandomRecipeSuccess = '[Recipe] Get Random Recipe Success',
    GetRandomRecipeFailure = '[Recipe] Get Random Recipe Failure',
    AddRecipe = '[Recipe] Get Random Recipe',
    AddRecipeSuccess = '[Recipe] Get Random Recipe Success',
    AddRecipeFailure = '[Recipe] Get Random Recipe Failure',
  }
  export const Init = createAction(RecipeActionsNames.Init);
  
  export const LoadRecipes = createAction(RecipeActionsNames.LoadRecipes);
  
  export const LoadRecipesSuccess = createAction(
    RecipeActionsNames.LoadRecipesSuccess,
    props<{ data: Recipe[] }>()
  );
  
  export const LoadRecipesFailure = createAction(
    RecipeActionsNames.LoadRecipesFailure,
    props<{ error: string | null }>()
  );
  
  export const GetRandomRecipe = 
  createAction(RecipeActionsNames.GetRandomRecipe);
  
  export const GetRandomRecipeSuccess = createAction(
    RecipeActionsNames.GetRandomRecipeSuccess,
    props<{ data: Recipe[] }>()
  );
  
  export const GetRandomRecipeFailure = createAction(
    RecipeActionsNames.GetRandomRecipeFailure,
    props<{ error: string | null }>()
  );
  
  export const AddRecipe = createAction(
    RecipeActionsNames.AddRecipe,
    props<{ data: Recipe }>()
  );
  
  export const AddRecipeSuccess = createAction(
    RecipeActionsNames.AddRecipeSuccess,
    props<{ data: Recipe }>()
  );
  
  export const AddRecipeFailure = createAction(
    RecipeActionsNames.AddRecipeFailure,
    props<{ error: string | null }>()
  );