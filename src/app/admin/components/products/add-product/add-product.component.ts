import { ProductService } from './../../../services/product/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListProduct } from '../productmodels/list-products';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/custom-toastr.service';
import { FileUploadOptions } from 'src/app/services/file-upload/file-upload.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productsModel: ListProduct[];

  @Output() createdProduct: EventEmitter<any> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'Upload',
    controller: 'Products',
    description: 'Please upload product images',
    accept: '.png, .jpg, .jpeg',
  };

  productForm: FormGroup = this.form.group({
    name: ['', [Validators.required]],
    stock: [0, [Validators.required]],
    price: [0, [Validators.required]],
    isActive: [false],
  });

  ngOnInit(): void {}

  constructor(
    private form: FormBuilder,
    private service: ProductService,
    private toastr: CustomToastrService
  ) {}

  create() {
    if (this.productForm.valid) {
      let returnModel: object = new Object({
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        stock: this.productForm.value.stock,
        isActive: this.productForm.value?.isActive,
      });
      this.service.add(returnModel, this.onSuccess, this.onError);
    }
  }

  onSuccess = () => {
    this.toastr.message(
      'Product has been added successfully!',
      'Successfull!',
      {
        closeButton: true,
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight,
        timeOut: 1500,
      }
    );
    this.createdProduct.emit();
    this.resetForm();
  };

  onError = (errorHeader: string, errorContent: string[]) => {
    errorContent.forEach((x) => {
      this.toastr.message(x, errorHeader, {
        closeButton: true,
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.BottomRight,
        timeOut: 1500,
      });
    });
  };

  resetForm() {
    this.productForm.reset({
      name: '',
      stock: 0,
      price: 0,
      isActive: false,
    });
  }
}
