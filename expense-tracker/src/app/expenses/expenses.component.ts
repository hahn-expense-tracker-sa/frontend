import { Component } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expenses } from '../../types';

@Component({
  selector: 'app-expense',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent  {
 constructor(
  private expensesService:ExpensesService
 ) { }
  ngOnInit(): void {
    this.expensesService.getExpenses('http://localhost:5244/api/Expenses')
    .subscribe((response : Expenses)=>{
      console.log(response.expenses);
    });
  }
}
