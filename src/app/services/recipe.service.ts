import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../classes/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/all`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/all`);
  }
}
