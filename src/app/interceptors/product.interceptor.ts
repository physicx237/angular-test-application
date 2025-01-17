import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHandler,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductInterceptor implements HttpInterceptor {
  private products: Product[] = [];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((item) => item.id === id) as Product;
  }

  createProduct(product: Omit<Product, 'id'>) {
    const id = this.products[this.products.length - 1]?.id + 1 || 0;

    this.products.push({
      id,
      ...product,
    });
  }

  updateProduct(product: Product) {
    this.products = this.products.map((item) =>
      item.id === product.id ? product : item
    );
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    this.products.splice(index, 1);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    switch (request.method) {
      case 'GET':
        const id = request.url.replaceAll('/', '').replace('products', '');

        return of(
          new HttpResponse({
            body: id !== '' ? this.getProductById(+id) : this.products,
          })
        ).pipe(delay(500));

      case 'POST':
        this.createProduct(request.body as Omit<Product, 'id'>);
        return of(new HttpResponse());

      case 'PUT':
        this.updateProduct(request.body as Product);
        return of(new HttpResponse());

      case 'DELETE':
        this.deleteProduct(+request.params.get('id')!);
        return of(new HttpResponse());

      default:
        return next.handle(request);
    }
  }
}
