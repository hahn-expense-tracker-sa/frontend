import { Component } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Router } from '@angular/router';
import { Expense } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-expense',
  imports: [CommonModule,FormsModule ],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {
  expense: Expense = {
    id: 0,
    name: '',
    amount: 0,
    date: new Date(),
    categoryId: ''
  };

  categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Transport' },
    { id: 3, name: 'Entertainment' },
    { id: 4, name: 'Utilities' },
    // Add other categories as necessary
  ];
  constructor(private expensesService: ExpensesService, private router: Router) {}

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(): void {
    this.expensesService.addExpense('http://localhost:5244/api/Expenses',this.expense).subscribe((response) => {
      console.log('Expense created:', response);
      this.router.navigateByUrl('/expenses');  // Use navigateByUrl() for clarity
    });
  }
}
