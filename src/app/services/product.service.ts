import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = '/products';

  constructor(private readonly httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.log(error);

        return of([]);
      })
    );
  }

  getProductById(id: number) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error);

        return of(null);
      })
    );
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.httpClient.post<void>(this.apiUrl, product);
  }

  updateProduct(product: Product) {
    return this.httpClient.put<void>(this.apiUrl, product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete<void>(this.apiUrl, {
      params: {
        id,
      },
    });
  }
}
