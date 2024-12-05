import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ExpensesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Expenses tracker';
}
