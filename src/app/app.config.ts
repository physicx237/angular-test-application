import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ProductInterceptor } from './interceptors/product.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ products: productReducer }),
    provideEffects(ProductEffects),
    { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true },
  ],
};
