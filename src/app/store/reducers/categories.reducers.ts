import { createReducer, on, Action } from '@ngrx/store';
import * as CategoriesActions from '../actions/categories.actions';
import { Category } from 'src/app/classes/category';

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: any;
}

export const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action
) {
  return categoryReducer(state, action);
}
