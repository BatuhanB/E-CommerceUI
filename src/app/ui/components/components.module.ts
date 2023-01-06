import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BasketsModule,
    HomeModule,
    ProductsModule
  ],exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
