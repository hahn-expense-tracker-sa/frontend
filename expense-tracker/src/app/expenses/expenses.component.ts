import { Component } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Router } from '@angular/router';
import { Expense, Expenses } from '../../types';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';  // Import DatePipe
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';


@Component({
  selector: 'app-expense',
  imports: [CommonModule,ConfirmDeleteModalComponent],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [DatePipe]
})


export class ExpensesComponent  {
  expenses: Expense[] = [];  // Define an empty array to store expenses
  deleteExpenseId: number =0; 

  constructor(
  private expensesService: ExpensesService,
  private router: Router,
  private datePipe: DatePipe
 ) { }

  ngOnInit(): void {
    this.expensesService.getExpenses('http://localhost:5244/api/Expenses')
    .subscribe((response : Expenses)=>{
      this.expenses = response.expenses;  // Store the response data in the expenses property
      console.log(this.expenses);     });
  }
  navigateToCreateExpense(): void {
    this.router.navigate(['/create-expense']);
  }

  // Show the confirmation modal
  openDeleteConfirmation(id: number): void {
    this.deleteExpenseId = id;
    // Show the modal
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
        this.closeModal();  // Close modal after deleting
      });
    }

    // Method to handle cancellation
    cancelDelete(): void {
      this.closeModal();  // Close the modal without deleting
    }

    // Close the modal
    closeModal(): void {
      const modal = document.getElementById('confirm-delete-modal') as HTMLElement;
      if (modal) {
        modal.style.display = 'none';
      }
    }

}
