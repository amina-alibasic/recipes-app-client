import { Category } from './category';
import { Ingredient } from './ingredient';

export class Recipe {
  id: number;
  name: string;
  servings: number;
  category: Category;
  preparationInstruction: string;
  dateAdded: Date;
  ingredients: Ingredient[];

  constructor(
    id: number,
    name: string,
    servings: number,
    category: Category,
    preparationInstruction: string,
    dateAdded: Date,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.category = category;
    this.preparationInstruction = preparationInstruction;
    this.dateAdded = dateAdded;
    this.ingredients = ingredients;
  }
}
