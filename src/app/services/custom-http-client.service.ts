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

  get<T>(
    requestParameters: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${requestParameters}${id ? `/${id}` : ''}`;
    }
    return this.httpClient.get<T>(url, {
      headers: requestParameters.headers,
      responseType: requestParameters.responseType as 'json',
    });
  }
  put<T>(
    requestParameters: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${requestParameters}`;
    }
    return this.httpClient.put<T>(url, body, {
      headers: requestParameters.headers,
      responseType: requestParameters.responseType as 'json',
    });
  }

  delete<T>(
    requestParameters: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${requestParameters}/${id}`;
    }
    return this.httpClient.delete<T>(url, {
      headers: requestParameters.headers,
      responseType: requestParameters.responseType as 'json',
    });
  }

  post<T>(
    requestParameters: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${requestParameters}`;
    }
    return this.httpClient.post<T>(url, body, {
      headers: requestParameters.headers,
      responseType: requestParameters.responseType as 'json',
    });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
  responseType?: string = 'json';
}
