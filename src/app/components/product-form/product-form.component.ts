import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OnlyNumbersDirective,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  mode = 'create';

  product!: Product;

  productForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required]),
  });

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    const mode = this.activatedRoute.snapshot.queryParamMap.get('mode')!;

    this.mode = mode;

    if (id !== null && mode === 'update') {
      this.getProductById(id).subscribe((product) => {
        if (!product) {
          return;
        }

        const { name, description, price } = product;

        this.product = product;

        this.productForm.patchValue({ name, description, price });
      });
    }
  }

  getProductById(id: number) {
    return this.productService.getProductById(id);
  }

  createProduct(product: Omit<Product, 'id'>) {
    this.productService
      .createProduct(product)
      .subscribe({ error: (error) => console.log(error) });
  }

  updateProduct(product: Product) {
    this.productService
      .updateProduct(product)
      .subscribe({ error: (error) => console.log(error) });
  }

  applyChanges() {
    const productFormValue = this.productForm.value as Omit<
      Product,
      'id' | 'photo'
    >;

    if (!this.productForm.valid) {
      return;
    }

    switch (this.mode) {
      case 'create':
        const newProduct = { ...productFormValue, photo: null };

        this.createProduct(newProduct);
        break;

      case 'update':
        const updateProduct = {
          id: this.product.id,
          ...productFormValue,
          photo: '',
        };

        this.updateProduct(updateProduct);
        break;

      default:
        break;
    }

    this.router.navigate(['/products']);
  }
}
