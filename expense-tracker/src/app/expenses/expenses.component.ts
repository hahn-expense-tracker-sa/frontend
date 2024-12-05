import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Router } from '@angular/router';
import { Expense, Expenses, Budget } from '../../types';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';  // Import DatePipe
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense',
  imports: [CommonModule, ConfirmDeleteModalComponent,FormsModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [DatePipe]
})

export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];  
  deleteExpenseId: number = 0;
  monthlyBudget: number = 0;  
  remainingBudget: number = 0;  
  totalExpenses: number = 0;  
  progressBarWidth: number = 0;  

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchExpensesAndBudget();
  }

  fetchExpensesAndBudget(): void {
    this.expensesService.getExpenses('http://localhost:5244/api/expenses').subscribe((response: Expenses) => {
      this.expenses = response.expenses;
      console.log('Expenses:', this.expenses);
      this.totalExpenses = response.totalExpenses;
      this.monthlyBudget = response.budget;
      this.remainingBudget = response.remainingBudget;
      this.calculateProgressBar();
    });
  }

  // Calculate the progress bar width based on remaining budget
  calculateProgressBar(): void {
    if (this.monthlyBudget > 0) {
      this.progressBarWidth = (this.remainingBudget / this.monthlyBudget) * 100;
    } else {
      this.progressBarWidth = 0;
    }
  }

  // Set the monthly budget
  setMonthlyBudget(): void {
    const budget: Budget = { amount: this.monthlyBudget, month: new Date() };
    this.expensesService.setBudget('http://localhost:5244/api/budget', budget).subscribe((response) => {
      console.log('Monthly budget set:', response);
      this.fetchExpensesAndBudget();  
    });
  }

  // Navigate to create expense page
  navigateToCreateExpense(): void {
    this.router.navigate(['/create-expense']);
  }

  // Show the confirmation modal
  openDeleteConfirmation(id: number): void {
    this.deleteExpenseId = id;
    const modal = document.getElementById('confirm-delete-modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  // Method to delete the expense
  deleteExpense(id: number): void {
    const url = `http://localhost:5244/api/Expenses/${id}`;
    this.expensesService.deleteExpense(url).subscribe(() => {
      this.expenses = this.expenses.filter(expense => expense.id !== id);  // Update the UI
      this.closeModal();  
    });
  }

  // Method to handle cancellation
  cancelDelete(): void {
    this.closeModal();  
  }

  // Close the modal
  closeModal(): void {
    const modal = document.getElementById('confirm-delete-modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
