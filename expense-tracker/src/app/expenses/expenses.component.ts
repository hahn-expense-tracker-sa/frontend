import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Router } from '@angular/router';
import { Expense, Expenses, Budget, categoryGroup } from '../../types';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';  
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-expense',
  imports: [CommonModule, ConfirmDeleteModalComponent, FormsModule, CanvasJSAngularChartsModule ],
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

  chartOptions: any;


  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchExpensesAndBudget();
  }

  // Fetch expenses and budget data from the backend
  fetchExpensesAndBudget(): void {
    this.expensesService.getExpenses('http://localhost:5244/api/expenses').subscribe((response: Expenses) => {
      this.expenses = response.expenses;
      this.totalExpenses = response.totalExpenses;
      this.monthlyBudget = response.budget;
      this.remainingBudget = response.remainingBudget;
      this.calculateProgressBar();  // Update the progress bar
      this.updatePieChartData();
    });
  }

  // Calculate the progress bar width based on remaining budget
  calculateProgressBar(): void {
    if (this.monthlyBudget > 0) {
      // Round the percentage to 2 decimal places
      this.progressBarWidth = Math.round((this.remainingBudget / this.monthlyBudget) * 100 * 100) / 100;
    } else {
      this.progressBarWidth = 0;
    }
  }

  // Set or update the monthly budget
  setMonthlyBudget(): void {
    // Ensure that the monthlyBudget is a valid value
    if (this.monthlyBudget > 0) {
      const budget: Budget = { amount: this.monthlyBudget, month: new Date() };
      this.expensesService.setBudget('http://localhost:5244/api/budget', budget).subscribe(
        (response) => {
          console.log('Monthly budget updated:', response);
          this.fetchExpensesAndBudget();  // Re-fetch expenses and budget after update
        },
        (error) => {
          console.error('Error updating the budget:', error);
        }
      );
    } else {
      alert("Please enter a valid budget value.");
    }
  }
  
// Update the pie chart with expenses grouped by category
updatePieChartData(): void {
  this.expensesService.getExpensesByCategory('http://localhost:5244/api/Expenses/getByCategory').subscribe((categoryData: categoryGroup[]) => {
    console.log('Category Data:', categoryData);  // Check if categoryData is correct

    if (categoryData && categoryData.length > 0) {
      // Initialize chartOptions with correct structure
      this.chartOptions = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title: {
          text: "Expenses by Category"
        },
        data: [{
          type: "pie",
          startAngle: 240,
          showInLegend: true,
          toolTipContent: "{name}: {y} $",
          indexLabel: "{name} - {y} $",
          dataPoints: categoryData.map((item: categoryGroup) => ({
            name: item.categoryName,   // Category name
            y: item.totalAmount       // Total amount for the category
          }))
        }]
      };

      console.log('Chart Options:', this.chartOptions);  // Log the entire chart options object
      console.log('Data Points:', this.chartOptions.data[0].dataPoints);  // Log the data points to make sure they are being correctly mapped

      // Trigger change detection if necessary
      this.cdRef.detectChanges();
    } else {
      console.error('No category data available.');
    }
  });
}




  // Navigate to create expense page
  navigateToCreateExpense(): void {
    this.router.navigate(['/create-expense']);
  }

  // Show the confirmation modal for deletion
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
      this.fetchExpensesAndBudget();  // Fetch the remaining budget
      this.closeModal();  // Close the modal
    });
  }

  // Method to handle cancellation of deletion
  cancelDelete(): void {
    this.closeModal();  
  }

  // Close the delete confirmation modal
  closeModal(): void {
    const modal = document.getElementById('confirm-delete-modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
