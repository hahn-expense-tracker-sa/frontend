import { Component } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expense, Expenses } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense',
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent  {
  expenses: Expense[] = [];  // Define an empty array to store expenses

 constructor(
  private expensesService:ExpensesService
 ) { }
  ngOnInit(): void {
    this.expensesService.getExpenses('http://localhost:5244/api/Expenses')
    .subscribe((response : Expenses)=>{
      this.expenses = response.expenses;  // Store the response data in the expenses property
      console.log(this.expenses);     });
  }
}
