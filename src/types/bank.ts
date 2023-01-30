import { IncomeSource } from '../constants/bank';

export class Income {
  id?: number | null;
  amount: number;
  source: keyof typeof IncomeSource;
  date?: string;

  constructor (
    source: (keyof typeof IncomeSource),
    amount: number = 0,
    date: string = '',
    id: number | null = null
  ) {
    this.id = id;
    this.amount = amount;
    this.source = source;
    this.date = date;
  }
}

export interface IBank {
  amount: number;
  incomes: Income[]
}
