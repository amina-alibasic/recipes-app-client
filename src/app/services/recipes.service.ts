import { Injectable } from '@angular/core';
import { Recipe } from '../classes/recipe';
import * as jsonData from '../../assets/recipes.json';



@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    constructor() { }

    getRecipes(): Recipe[]{
        let recipesJSON = jsonData;
        return recipesJSON.recipes;
    }
}