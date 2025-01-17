import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/actions/product.actions';
import { AppState } from '../../store/reducers/product.reducer';
import { selectProducts } from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products$!: Observable<Product[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);

    this.store.dispatch(ProductActions.loadProducts());
  }
}
