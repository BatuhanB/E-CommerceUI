import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{

  ngOnInit(): void {}

  productForm = this.form.group({
    name:['',Validators.required,Validators.minLength(3)],
    stock:['',Validators.required],
    price:['',Validators.required],
  });

  constructor(private form:FormBuilder){}


  validators(){

  }
}
