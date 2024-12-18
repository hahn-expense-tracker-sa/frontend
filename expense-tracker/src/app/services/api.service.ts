import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { options } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { 
  }
  get<T>(url: string,options?: options): Observable<T> {
    return this.httpClient.get<T>(url,options) as Observable<T>;
  }
  
  post<T>(url: string, body: any, options?: options): Observable<T> {
    return this.httpClient.post<T>(url, body, options);
  }

  delete(url: string): Observable<void> {
  return this.httpClient.delete<void>(url);
  }
}
