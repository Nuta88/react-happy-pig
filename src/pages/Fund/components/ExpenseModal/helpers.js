import { convertToCurrency, convertToPennies } from '../../../../utils/fund';
import { convertDateToString, parseDate } from '../../../../utils/date';
import { dateFormat } from '../../../../constants/common';

export const convertExpenseToFormValues = expense => {
  return {
    ...expense,
    paymentAmount: convertToCurrency(expense.paymentAmount),
    date: parseDate(expense.date, dateFormat)
  };
};

export const convertFormValuesToExpense = (expense, formValues) => {
  return {
    ...expense,
    ...formValues,
    paymentAmount: convertToPennies(formValues.paymentAmount),
    date: convertDateToString(formValues.date)
  }
};
