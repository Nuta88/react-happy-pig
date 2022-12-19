import { convertToCurrency, convertToPennies } from '../../../../utils/fund';
import { convertDateToString, parseDate, TDate } from '../../../../utils/date';
import { dateFormat } from '../../../../constants/common';
import { Expense } from '../../../../types';

export type TFormValues = {
  recipient: string,
  description: string,
  paymentAmount: number,
  date: TDate
}

export const convertExpenseToFormValues = (expense: Expense) => {
  return {
    ...expense,
    paymentAmount: convertToCurrency(expense.paymentAmount),
    date: parseDate(expense.date, dateFormat)
  };
};

export const convertFormValuesToExpense = (expense: Expense | null, formValues: TFormValues) => {
  const { recipient, paymentAmount, date, description } = formValues;
  
  return new Expense(convertToPennies(paymentAmount), convertDateToString(date), recipient, description, expense?.id);
};
