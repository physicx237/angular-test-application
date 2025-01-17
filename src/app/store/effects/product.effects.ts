import { Injectable, inject } from '@angular/core';
import { exhaustMap, map, catchError, EMPTY, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import * as ProductActions from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.productsLoadedSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      exhaustMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          switchMap(() => this.productService.getProducts()),
          map((products) => ProductActions.productsLoadedSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      exhaustMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          switchMap(() => this.productService.getProducts()),
          map((products) => ProductActions.productsLoadedSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      exhaustMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          switchMap(() => this.productService.getProducts()),
          map((products) => ProductActions.productsLoadedSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
