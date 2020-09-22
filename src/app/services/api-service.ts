import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  tunnelApiCalls: boolean;

  constructor(protected http: HttpClient) {
    
  }

  buildRequestHeaders() {
    let httpHeaders = null;
    httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return httpHeaders;
  }

}
