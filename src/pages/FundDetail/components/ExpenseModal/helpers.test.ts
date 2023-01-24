import { parseDate } from '../../../../utils/date';

import {
  convertExpenseToFormValues,
  convertFormValuesToExpense
} from './helpers';

describe('Helper FundDetail tests', () => {
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
      paymentAmount: 1501,
      date: parseDate('2022-12-03'),
      recipient: 'Test recipient',
      description: 'Test'
    };
    const result = {
      id: null,
      paymentAmount: 150100,
      recipient: 'Test recipient',
      description: 'Test',
      date: '2022-12-03'
    };

    expect(convertFormValuesToExpense(null, formValues)).toEqual(result);
  });
});
