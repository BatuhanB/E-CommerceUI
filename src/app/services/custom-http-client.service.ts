import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParameters: Partial<RequestParameters>): string {
    return `${
      requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl
    }/${requestParameters.controller}${
      requestParameters.action ? `/${requestParameters.action}` : ''
    }`;
  }

  get<T>(requestParameters: RequestParameters, id?: string): Observable<T> {
    let url: string = '';
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${id ? `/${id}` : ''}`;
    }
    return this.httpClient.get<T>(url, {
      headers: requestParameters.headers,
      responseType: requestParameters.responseType as 'json',
    });
  }
  put() {}

  delete() {}

  post() {}
}

export class RequestParameters {
  controller?: string;
  action?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
  responseType?: string = 'json';
}
