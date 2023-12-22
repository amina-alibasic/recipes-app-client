import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recipe } from "../classes/recipe";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private recipesUrl = "assets/recipes.json"; // Path to your local JSON file

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }
}
