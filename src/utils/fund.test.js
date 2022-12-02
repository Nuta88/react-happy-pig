import {
  convertToCurrency,
  convertToPennies,
  toUSD,
  getFundAmount
} from './fund';

describe('Fund util tests', () => {
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
  describe('getFundAmount tests', () => {
    const pennies = 1000;
    test('should return fund currency amount', () => {
      const result = '$10';

      expect(getFundAmount(pennies)).toEqual(result);
    });
    test('should return zero for empty amount', () => {
      const result = '$0';

      expect(getFundAmount()).toEqual(result);
    });
  });
});
