import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Budget, Category, categoryGroup, Expense, Expenses, PaginationParams } from '../../types';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private apiService:ApiService) { }

  getExpenses=(url:string): Observable<Expenses>=>{
    return this.apiService.get(url);
  }

  getExpensesByCategory(url: string): Observable<categoryGroup[]> {
    return this.apiService.get(url);
  }

  // Method to add a new expense
  addExpense(url: string,expense: Expense): Observable<Expense> {
    return this.apiService.post(url, expense);
  }

  // Method to delete an expense
  deleteExpense(url: string): Observable<void> {
    return this.apiService.delete(url);
  }
  // Fetch categories from backend
  getCategories(url:string): Observable<Category[]> {
    return this.apiService.get(url);
  }

  // Method to create a new category
  createCategory(url:string,category:Category): Observable<any> {
    return this.apiService.post(url, category);
  }
  // Set the monthly budget
  setBudget(url: string, budget: Budget): Observable<Budget> {
    return this.apiService.post(url, budget);  // Make a POST request to set the budget
  }

  
}
