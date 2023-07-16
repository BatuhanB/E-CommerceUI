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
            successCallBack();
            this.toastr.message(
              'Product has been added successfully!',
              'Successfull!',
              {
                closeButton: true,
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.BottomRight,
              }
            );
          } else {
            this.toastr.message('Product could not added!', 'Error!', {
              closeButton: true,
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight,
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
            successCallBack();
            this.toastr.message(
              'Product has been successfully updated!',
              'Successfull!',
              {
                closeButton: true,
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.BottomRight,
              }
            );
          } else {
            this.toastr.message('Product could not updated!', 'Error!', {
              closeButton: true,
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight,
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
              });
            });
        },
      });
  }

  getAll(): Observable<ListProduct[]> {
    return this.http.get<ListProduct[]>({
      controller: 'Products',
      action: 'GetAll',
    });
  }
}
