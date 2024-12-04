import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';  // Import the ExpenseService

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expense = { name: '', amount: '', categoryId: 1, date: '' }; // Model for new expense
  expenses: any[] = []; // Array to hold fetched expenses

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getExpenses(); // Fetch expenses when the component initializes
  }

  // Fetch all expenses
  getExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data; // Store the fetched expenses in the component
    });
  }

  // Add a new expense
  addExpense(): void {
    this.expenseService.addExpense(this.expense).subscribe(() => {
      this.getExpenses(); // Refresh the list of expenses after adding
      this.expense = { name: '', amount: '', categoryId: 1, date: '' }; // Reset the form
    });
  }

  // Delete an expense
  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.getExpenses(); // Refresh the list of expenses after deletion
    });
  }
}
