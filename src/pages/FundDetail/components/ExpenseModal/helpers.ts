import { dateFormat } from '../../../../constants/common';
import { Expense } from '../../../../types';
import {
  convertDateToString,
  parseDate,
  TDate,
  today,
  TParseDate
} from '../../../../utils/date';
import { convertToCurrency, convertToPennies } from '../../../../utils/fund';

export interface IFormValues {
  recipient: string;
  description: string;
  paymentAmount: number;
  date: TDate
}
export interface IInitialValues {
  recipient: string;
  description?: string;
  id: number | null;
  paymentAmount: number;
  date: string | TParseDate
}

export const createInitFormValues = (expense: Expense | null): IInitialValues => {
  if (expense) return convertExpenseToFormValues(expense);

  return {
    ...new Expense(),
    paymentAmount: 1,
    date: today
  };
};

export const convertExpenseToFormValues = (expense: Expense): IInitialValues => {
  return {
    ...expense,
    paymentAmount: convertToCurrency(expense.paymentAmount),
    date: parseDate(expense.date, dateFormat)
  };
};

export const convertFormValuesToExpense = (expense: Expense | null, formValues: IFormValues): Expense => {
  const { recipient, paymentAmount, date, description } = formValues;

  return new Expense(convertToPennies(paymentAmount), convertDateToString(date), recipient, description, expense?.id);
};
