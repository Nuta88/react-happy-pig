import { parseDate } from '../../../../../utils/date';
import {
  convertExpenseToFormValues,
  convertFormValuesToExpense,
  isAmountAvailable
} from '../helpers';

describe('Helper FundDetail tests', () => {
  test('Convert Expense values to Form values tests', () => {
    const expense = {
      id: 2,
      fundId: 1,
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
      fundId: 1,
      paymentAmount: 150100,
      recipient: 'Test recipient',
      description: 'Test',
      date: '2022-12-03'
    };

    expect(convertFormValuesToExpense(null, 1, formValues)).toEqual(result);
  });
  describe('isAmountAvailable', () => {
    test('returns true when amount is less than available amount', () => {
      expect(isAmountAvailable(50, 100)).toBe(true);
    });
    test('returns true when amount equals available amount', () => {
      expect(isAmountAvailable(100, 100)).toBe(true);
    });
    test('returns false when amount is greater than available amount', () => {
      expect(isAmountAvailable(150, 100)).toBe(false);
    });
  });
});
