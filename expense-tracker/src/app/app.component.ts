import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CreateExpenseComponent } from './create-expense/create-expense.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ExpensesComponent,HeaderComponent,FooterComponent,CommonModule,CreateExpenseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Expenses tracker';
}
