import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/all`);
  }
}
