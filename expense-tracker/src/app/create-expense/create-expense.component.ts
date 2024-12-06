import { Component } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Router } from '@angular/router';
import { Category, Expense } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-expense',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent {
  expense: Expense = {
    id: 0,
    name: '',
    amount: 0,
    date: new Date(),
    categoryId: ''
  };
  newCategory: string = '';  // For creating new category
  categories: Category[] = []; 

  constructor(private expensesService: ExpensesService, private router: Router) {}

  ngOnInit(): void {
    // Fetch categories from the backend on component load (this should be done)
    this.expensesService.getCategories('http://localhost:5244/api/categories').subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.expense.categoryId === 'new' && this.newCategory.trim()) {
      // Create a new category and use the returned ID
      this.createNewCategory(this.newCategory).subscribe((createdCategory) => {
        // Assign the newly created category ID to the expense
        this.expense.categoryId = createdCategory.id;  // Use the ID returned by the backend
        this.saveExpense();  // Save the expense with the new category
      });
    } else {
      // Save the expense with the selected category
      this.saveExpense();
    }
  }

  saveExpense(): void {
    // Send the expense to the backend for saving
    this.expensesService.addExpense('http://localhost:5244/api/Expenses', this.expense).subscribe((response) => {
      console.log('Expense created:', response);
      this.router.navigateByUrl('/expenses');  // Use navigateByUrl() for clarity
       // Update the pie chart data
    });    
  }

  // Method to create a new category (this will call the API to create the category)
  createNewCategory(categoryName: string) {
    const newCategory: Category = { name: categoryName };  // Create a new category object
    return this.expensesService.createCategory('http://localhost:5244/api/categories', newCategory);  // Send the category to the backend
  }
}
