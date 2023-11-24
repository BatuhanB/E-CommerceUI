import { Component, OnInit, ViewChild } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  selectedProduct: any;
  constructor() { }

  ngOnInit(): void { }

  @ViewChild(ListProductComponent) listComponent: ListProductComponent
  createdProduct(createdProduct: any) {
    this.listComponent.getAll();
    console.log("event emitter triggered");
    
  }
}
