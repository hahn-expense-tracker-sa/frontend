import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface options {
    Headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: "body";
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: "json";
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface Expense {
    id: number;
    amount: number;
    name: string;
    date: Date;
    categoryId: string;
}

export interface Expenses {
    expenses: Expense[];
    totalExpenses: number;
    budget: number;
    remainingBudget: number;
}
export interface Category {
    id?: number;
    name: string;
    expenses?: Expense[];
}
export interface PaginationParams {
   [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
   page: number;
   perPage: number;
}
export interface Budget {   
    id?: number;
    amount: number;
    month:Date;
}
