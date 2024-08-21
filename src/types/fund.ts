import { BankTransferType } from '../constants/bank';
import {
  convertDateToString,
  today
} from '../utils/date';
import { convertToPennies } from '../utils/fund';

export class Expense {
  id: number | null;
  paymentAmount: number;
  recipient: string;
  date?: string;
  description?: string;

  constructor (
    paymentAmount: number = convertToPennies(1),
    date: string = convertDateToString(today),
    recipient: string = '',
    description: string = '',
    id: number | null = null
  ) {
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
  priority: string;
  creationDate: string;
  currentAmount: number;
  plannedAmount: number;
  receivedAmount: number;
  description?: string | null;
  links?: string[];
  constructor (
    name: string = '',
    priority: string = '',
    currentAmount: number = 0,
    plannedAmount: number = 0,
    receivedAmount: number = 0,
    id: number | null = null,
    creationDate: string = '',
    expenses: Expense[] = [],
    links: string[] = [],
    description: string | null
  ) {
    this.id = id;
    this.name = name;
    this.currentAmount = currentAmount;
    this.plannedAmount = plannedAmount;
    this.receivedAmount = receivedAmount;
    this.expenses = expenses;
    this.description = description;
    this.priority = priority;
    this.links = links;
    this.creationDate = creationDate;
  }

  expenses: Expense[];
}

export class CreationFund {
  name: string;
  priority: string;
  plannedAmount: number;
  requestedAmount: number;
  creationDate: string;
  description?: string | null;
  links: string[];
  constructor (
    name: string = '',
    priority: string,
    creationDate: string = '',
    plannedAmount: number = 0,
    requestedAmount: number = 0,
    links: string[] = [],
    description: string | null = null
  ) {
    this.name = name;
    this.plannedAmount = plannedAmount;
    this.requestedAmount = requestedAmount;
    this.priority = priority;
    this.creationDate = creationDate;
    this.description = description;
    this.links = links;
  }
}

export interface Transfer {
  fundId: number;
  amount: number;
  transferType: keyof typeof BankTransferType
}

export interface IFundInfo {
  priority: string;
  creationDate: string;
  description?: string | null;
  links: string[]
}
export interface IFundFilter {
  priority?: string;
  name?: string;
  date?: string
}

export interface IMovingExpense {
  newFundId: number;
  expenseId: number
}
