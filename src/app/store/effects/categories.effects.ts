import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CategoryActions from '../actions/categories.actions';
import { Category } from 'src/app/classes/category';
import { CategoryService } from 'src/app/services/category.service';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      switchMap(() =>
        this.categoryService.getAllCategories().pipe(
          map((categories: Category[]) =>
            CategoryActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(CategoryActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
