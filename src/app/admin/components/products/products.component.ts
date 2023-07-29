import { Component, OnInit, ViewChild } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProduct } from './productmodels/list-products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  selectedProduct:any;
  constructor(private service: ProductService,) { }

  ngOnInit(): void {
    this.selectedProduct = this.service.getSelectedProduct();
  }

  
  @ViewChild(ListProductComponent) listComponent : ListProductComponent
  createdProduct(createdProduct:any){
    this.listComponent.getAll();
  }

}
