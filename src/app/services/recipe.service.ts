import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../classes/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllRecipes(
    sortBy: string = 'date',
    sortOrder: string = 'DESC',
    searchValue?: string,
    categoryIds?: number[],
    page: number = 0,
    size: number = 20
  ): Observable<Recipe[]> {
    let params = new HttpParams()
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('page', page)
      .set('size', size);
    if (searchValue) {
      params = params.set('searchValue', searchValue);
    }
    if (categoryIds && categoryIds.length > 0) {
      params = params.set('categoryIds', categoryIds.join(','));
    }
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/all`, {
      params,
    });
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/all`);
  }
}
