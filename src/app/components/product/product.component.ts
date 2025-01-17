import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/actions/product.actions';

@Component({
  selector: 'app-product',
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private readonly store: Store) {}

  deleteProduct(id: number) {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
  }
}
