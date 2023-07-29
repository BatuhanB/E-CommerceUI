import { ProductService } from './../../../services/product.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListProduct } from '../productmodels/list-products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit{
  
  selectedId: number;
  productsModel: ListProduct[];
  @Input() selectedProduct:ListProduct;
  @Output() createdProduct: EventEmitter<any> = new EventEmitter();

  productForm = this.form.group({
    name: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    isActive: [''],
  });

  ngOnInit(): void {
    
    
    this.setProduct(this.selectedProduct);
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
        console.log(this.selectedId);
        
        this.createdProduct.emit();
      } else {
        this.service.add(returnModel,this.clearForm);
        console.log(this.selectedId);
        this.createdProduct.emit();
      }
    }
  }

  setProduct(product:ListProduct){
    // this.productForm.controls.name.setValue(product.name);
    // this.productForm.controls.price.setValue(product.price.toString());
    // this.productForm.controls.stock.setValue(product.stock.toString());
    // this.productForm.controls.isActive.setValue(product.isActive.toString());
  }

  clearForm() {
    this.selectedId = 0;
    this.productForm.get("name")?.setValue('');
    // this.productForm.get("stock")?.setValue(0);
    // this.productForm.get("price")?.setValue(0);
    // this.productForm.get("isActive")?.setValue(false);
  }
}

