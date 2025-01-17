import { createSelector } from '@ngrx/store';
import { AppState, ProductState } from '../reducers/product.reducer';

export const selectProducts = createSelector(
  (appState: AppState) => appState.products,
  (productState: ProductState) => productState.products
);
