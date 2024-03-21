import {
  convertToCurrency,
  convertToPennies,
  toUSD,
  getAmount,
  getPercentage,
  upsertExpense,
  countPaymentAmounts
} from './fund';

describe('FundDetail util tests', () => {
  describe('Convert to currency tests', () => {
    const pennies = 1000;

    test('should convert pennies to currency', () => {
      const result = 10;

      expect(convertToCurrency(pennies)).toEqual(result);
    });
    test('should not return currency', () => {
      expect(convertToCurrency(pennies)).not.toEqual(pennies);
    });
  });
  describe('Convert to pennies tests', () => {
    const currency = 10;

    test('should convert pennies to currency', () => {
      const result = 1000;

      expect(convertToPennies(currency)).toEqual(result);
    });
    test('should not return pennies', () => {
      expect(convertToCurrency(currency)).not.toEqual(currency);
    });
  });
  describe('toUSD tests', () => {
    test('should convert to USD', () => {
      const result = '$1,000';

      expect(toUSD(1000)).toEqual(result);
    });
    test('should not return number', () => {
      expect(toUSD(1000)).not.toEqual(1000);
    });
  });
  describe('FundDetail Amount tests', () => {
    const pennies = 1000;
    test('should return fund currency amount', () => {
      const result = '$10';

      expect(getAmount(pennies)).toEqual(result);
    });
    test('should return zero for empty amount', () => {
      const result = '$0';

      expect(getAmount()).toEqual(result);
    });
  });
  describe('Percentage tests', () => {
    test('should return fund percentage', () => {
      const data = { currentAmount: 10, plannedAmount: 1000 };
      const result = 99;

      expect(getPercentage(data)).toEqual(result);
    });
    test('should return zero for empty fund', () => {
      const data = {};
      const result = 0;

      expect(getPercentage(data)).toEqual(result);
    });
  });
  describe('Upsert FundDetail Expense tests', () => {
    const expenses = [
      {
        id: 1,
        paymentAmount: 150100,
        recipient: 'Test recipient',
        description: 'Test',
        date: '2022-12-03'
      }
    ];
    test('should add new expense to list', () => {
      const expense = {
        id: 2,
        paymentAmount: 150100,
        recipient: 'Test recipient',
        description: 'Test',
        date: '2022-12-03'
      };

      const result = [ ...expenses, expense ];

      expect(upsertExpense(expenses, expense)).toEqual(result);
    });
    test('should update exist expense', () => {
      const expense = {
        id: 1,
        paymentAmount: 150100,
        recipient: 'Test recipient',
        description: 'Test',
        date: '2022-12-05'
      };

      const result = [ expense ];

      expect(upsertExpense(expenses, expense)).toEqual(result);
    });
  });
  test('should count all payment amounts', () => {
    const expenses = [
      {
        id: 1,
        paymentAmount: 150,
        recipient: 'Test recipient',
        description: 'Test',
        date: '2022-12-03'
      },
      {
        id: 2,
        paymentAmount: 150,
        recipient: 'Test recipient',
        description: 'Test',
        date: '2022-12-03'
      }
    ];
    const result = 300;

    expect(countPaymentAmounts(expenses)).toEqual(result);
  });
});
