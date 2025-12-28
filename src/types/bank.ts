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
  loanAmount: number;
  loanRepaymentAmount: number;
  loanBalance: number;
  incomesTotalAmount: number;
  transfersTotalAmount: number
}

export interface LoanPayment {
  id?: number;
  loanId: number;
  amount: number;
  date: string
}

export interface ILoan {
  id: number;
  name: string;
  amount: number;
  balance: number;
  repaymentAmount: number;
  paymentAmount: number;
  description: string;
  loanPayments: LoanPayment[];
  startDate: string;
  endDate: string

}

export type TLoanCreate = Pick<ILoan, 'name' | 'paymentAmount' | 'amount' | 'startDate' | 'description'>;
