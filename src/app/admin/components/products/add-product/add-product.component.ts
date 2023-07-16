import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListProduct } from '../productmodels/list-products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  selectedId: number;
  productsModel: ListProduct[];

  productForm = this.form.group({
    name: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    isActive: [''],
  });

  ngOnInit(): void {
    this.getProducts();
  }

  constructor(private form: FormBuilder, private service: ProductService) {}

  saveOrUpdate() {
    if (this.productForm.valid) {
      let returnModel: object = new Object({
        id: this.selectedId,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        stock: this.productForm.value.stock,
        isActive: this.productForm.value?.isActive,
      });
      if (this.selectedId > 0) {
        this.service.update(returnModel);
      } else {
        this.service.add(returnModel);
      }
    }
  }

  getProducts() {
    this.service.getAll().subscribe({
      next: (val) => {
        this.productsModel = val;
      },
    });
  }


  clearForm() {
    this.selectedId = 0;
    this.productForm.get("name")?.setValue('');
    // this.productForm.get("stock")?.setValue(0);
    // this.productForm.get("price")?.setValue(0);
    // this.productForm.get("isActive")?.setValue(false);
  }
}

