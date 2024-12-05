import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Expenses, PaginationParams } from '../../types';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private apiService:ApiService) { }

  getExpenses=(url:string): Observable<Expenses>=>{
    return this.apiService.get(url);
  }
}
