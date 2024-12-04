import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // For HTTP requests
import { FormsModule } from '@angular/forms'; // For template-driven forms

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses.component'; // Import ExpensesComponent

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent  // Declare ExpensesComponent here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Include HttpClientModule for API calls
    FormsModule        // Include FormsModule for template-driven forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
