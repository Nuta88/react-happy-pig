import { Expense } from './fund';

export interface BillTracker {
  id: number;
  expenses: Expense;
  expensesCurrentSum: number
}
