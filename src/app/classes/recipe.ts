import { Category } from './category';
import { Ingredient } from './ingredient';

export class Recipe {
  id?: number | undefined;
  name: string;
  servings: number;
  category: Category;
  preparationInstruction: string;
  date: Date = new Date();
  ingredients: Ingredient[];

  constructor(
    name: string,
    servings: number,
    category: Category,
    preparationInstruction: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.servings = servings;
    this.category = category;
    this.preparationInstruction = preparationInstruction;
    this.ingredients = ingredients;
  }
}
