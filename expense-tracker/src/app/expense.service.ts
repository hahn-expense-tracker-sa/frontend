import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5244/api/Expenses'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Get all expenses
  getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl);  // GET request to fetch expenses
  }

  // Add a new expense
  addExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrl, expense);  // POST request to add an expense
  }

  // Delete an expense
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);  // DELETE request to remove an expense
  }
}
