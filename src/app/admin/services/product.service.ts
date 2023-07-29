import { Observable } from 'rxjs';
import { CustomHttpClientService } from './../../services/custom-http-client.service';
import { Injectable } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/custom-toastr.service';
import { ListProduct } from '../components/products/productmodels/list-products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProduct:any;
  constructor(
    private http: CustomHttpClientService,
    private toastr: CustomToastrService
  ) {}

  add(model: object,successCallBack?: () => void) {
    this.http
      .post<object>(
        {
          action: 'Add',
          controller: 'Products',
        },
        model
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.toastr.message(
              'Product has been added successfully!',
              'Successfull!',
              {
                closeButton: true,
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.BottomRight,
                timeOut:1500
              }
            );
            successCallBack();
          } else {
            this.toastr.message('Product could not added!', 'Error!', {
              closeButton: true,
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight,
              timeOut:1500
            });
          }
        },
        error: (err) => {
          const _errors: Array<{ key: string; value: Array<string> }> =
            err.error;
            _errors.forEach(x => {
              this.toastr.message(`${x.value}`, `Error at ${x.key}!`, {
                closeButton: true,
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomRight,
                timeOut:1500
              });
            });
        },
      });
  }

  update(model: object,successCallBack?:() => void) {
    this.http
      .put<object>(
        {
          action: 'Update',
          controller: 'Products',
        },
        model
      )
      .subscribe({
        next: (res) => {
          if (res) {
            //successCallBack();
            this.toastr.message(
              'Product has been successfully updated!',
              'Successfull!',
              {
                closeButton: true,
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.BottomRight,
                timeOut:1500
              }
            );
          } else {
            this.toastr.message('Product could not updated!', 'Error!', {
              closeButton: true,
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight,
              timeOut:1500
            });
          }
        },
        error: (err) => {
          const _errors: Array<{ key: string; value: Array<string> }> =
            err.error;
            _errors.forEach(x => {
              this.toastr.message(`${x.value}`, `Error at ${x.key}!`, {
                closeButton: true,
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomRight,
                timeOut:1500
              });
            });
        },
      });
  }

  getAll(pageNumber:number = 0,pageSize:number = 10): Observable<{totalCount:number;data:ListProduct[]}> {
    return this.http.get<{totalCount:number;data:ListProduct[]}>({
      controller: 'Products',
      action: 'GetAll',
      queryString:`page=${pageNumber}&size=${pageSize}`
    });
  }

  getById(id:string): Observable<ListProduct> {
    return this.http.get<ListProduct>({
      controller: 'Products',
      action: 'Get'
    },id);
  }

  setSelectedProduct(product: any) {
    this.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }
}
