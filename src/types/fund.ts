export class Expense {
  id: number | null;
  paymentAmount: number;
  recipient: string;
  date?: string;
  description?: string;

  constructor (
    paymentAmount: number = 0,
    date: string = '',
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
  plannedAmount: number;
  currentAmount: number;
  constructor (
    name: string = '',
    plannedAmount: number = 0,
    currentAmount: number = 0,
    id: number | null = null,
    expenses: Expense[] = []
  ) {
    this.id = id;
    this.name = name;
    this.plannedAmount = plannedAmount;
    this.currentAmount = currentAmount;
    this.expenses = expenses;
  }

  expenses: Expense[];
}
