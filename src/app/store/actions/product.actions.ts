import { createAction, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';

export const loadProducts = createAction(
  '[Product List Component] Load Products'
);

export const createProduct = createAction(
  '[Product List Component] Create Product',
  props<{ product: Omit<Product, 'id'> }>()
);

export const updateProduct = createAction(
  '[Product List Component] Update Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product List Component] Delete Product',
  props<{ id: number }>()
);

export const productsLoadedSuccess = createAction(
  '[Product List Component] Products Loaded Success',
  props<{ products: Product[] }>()
);
