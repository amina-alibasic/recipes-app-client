import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../reducers/categories.reducers';

export const selectorCategoriesState =
  createFeatureSelector<CategoriesState>('categories');

export const selectCategories = createSelector(
  selectorCategoriesState,
  (state) => state.categories
);
