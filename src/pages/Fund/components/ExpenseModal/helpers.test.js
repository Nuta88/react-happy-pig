import {
  convertExpenseToFormValues,
  convertFormValuesToExpense
} from './helpers';

import { parseDate } from '../../../../utils/date';

describe('Helper Fund tests', () => {
  test('Convert Expense values to Form values tests', () => {
    const expense = {
      id: 2,
      paymentAmount: 150100,
      recipient: 'Test recipient',
      description: 'Test',
      date: '2022-12-03'
    };
    const result = { ...expense, date: parseDate(expense.date), paymentAmount: 1501 };

    expect(convertExpenseToFormValues(expense)).toEqual(result);
  });
  test('Convert Form values to Expense values tests', () => {
    const formValues = {
      id: 2,
      paymentAmount: 1501,
      recipient: 'Test recipient',
      description: 'Test',
      date: parseDate('2022-12-03')
    };
    const result = {
      id: 2,
      paymentAmount: 150100,
      recipient: 'Test recipient',
      description: 'Test',
      date: '2022-12-03'
    };

    expect(convertFormValuesToExpense({}, formValues)).toEqual(result);
  });
});
