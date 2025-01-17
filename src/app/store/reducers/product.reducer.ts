import { createReducer, on } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import * as ProductActions from '../actions/product.actions';

export interface ProductState {
  products: Product[];
}

export interface AppState {
  products: ProductState;
}

export const initialState: ProductState = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.productsLoadedSuccess, (_, { products }) => ({
    products,
  }))
);
