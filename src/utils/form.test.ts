import {
  errorBankAmountMessage,
  errorFundAmountMessage,
  generateError
} from './form';

describe('Form util tests', () => {
  test('should create error', () => {
    const error = {
      name: 'name',
      errors: [ 'Error name' ]
    };

    expect(generateError('name', [ 'Error name' ])).toEqual(error);
  });

  describe('Fund Amount Error', () => {
    test('should create bank error message', () => {
      const message = 'Available money of the bank is equal to 10$';
      expect(errorBankAmountMessage(1000)).toEqual(message);
    });
    test('should create fund error message', () => {
      const message = 'Available money of the fund is equal to 10$';
      expect(errorFundAmountMessage(1000)).toEqual(message);
    });
  });
});
