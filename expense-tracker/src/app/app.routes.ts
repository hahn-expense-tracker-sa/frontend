import { Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';

export const routes: Routes = [
    { path: '', component: ExpensesComponent },
    { path: 'expenses', component: ExpensesComponent },
    { path: 'create-expense', component: CreateExpenseComponent },

];
