import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    ListProductComponent,
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild([
      {path:'',component:ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
