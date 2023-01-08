import { IncomeSource } from "../constants/bank";

export class Expense {
  id: number | null;
  paymentAmount: number;
  recipient: string;
  date?: string;
  description?: string;
  
  constructor(paymentAmount: number = 0,
              date: string= '',
              recipient: string = '',
              description: string = '',
              id: number | null = null) {
    this.id = id;
    this.paymentAmount = paymentAmount;
    this.date = date;
    this.recipient = recipient;
    this.description = description;
  }
}

export class Fund {
  id: number | null;
  name: string;
  plannedAmount: number;
  currentAmount?: number | null;
  expenses: Array<Expense>;
  
  constructor(name: string = '',
              plannedAmount: number = 0,
              id: number | null = null,
              currentAmount: number | null = null,
              expenses: Array<Expense> = []) {
    this.id = id;
    this.name = name;
    this.plannedAmount = plannedAmount;
    this.currentAmount = currentAmount;
    this.expenses = expenses;
  }
}

export interface Income {
  id?: number,
  amount: number,
  source: IncomeSource,
  date?: string;
}
export interface IBank {
  amount: number,
  incomes: Income[]
}
