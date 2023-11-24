import { Observable, firstValueFrom } from 'rxjs';
import { CustomHttpClientService } from './../../services/custom-http-client.service';
import { Injectable } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/custom-toastr.service';
import { ListProduct } from '../components/products/productmodels/list-products';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProduct: any;
  constructor(
    private http: CustomHttpClientService,
    private toastr: CustomToastrService
  ) { }

  add(model: object, successCallBack?: () => void, errorCallBack?: () => void) {
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
          } else {
            errorCallBack();

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
              timeOut: 1500
            });
          });
        },
      });
  }

  update(model: object, successCallBack?: () => void) {
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
                timeOut: 1500
              }
            );
          } else {
            this.toastr.message('Product could not updated!', 'Error!', {
              closeButton: true,
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight,
              timeOut: 1500
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
              timeOut: 1500
            });
          });
        },
      });
  }

  async getAll(pageNumber: number = 0, pageSize: number = 10, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; data: ListProduct[] }> {
    var data:Promise<{ totalCount: number; data: ListProduct[] }> = this.http.get<{ totalCount: number; data: ListProduct[] }>({
      controller: 'Products',
      action: 'GetAll',
      queryString: `page=${pageNumber}&size=${pageSize}`
    }).toPromise();

    data.then(d => successCallBack())
    .catch((errorResponse:HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await data;
  }


  getById(id: string): Observable<ListProduct> {
    return this.http.get<ListProduct>({
      controller: 'Products',
      action: 'Get'
    }, id);
  }

  async delete(id: string) {
    const obsrvbl = this.http.delete<any>({
      controller: "Products",
      action: "Delete"
    }, id);

    await firstValueFrom(obsrvbl);
  }
}
