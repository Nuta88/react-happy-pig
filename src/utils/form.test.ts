
import {
  errorFundAmountMessage,
  generateError
} from './form';
import { convertToCurrency } from './fund';

describe('Form util tests', () => {
  test('should create error', () => {
    const error = {
      name: 'name',
      errors: [ 'Error name' ]
    };

    expect(generateError('name', [ 'Error name' ])).toEqual(error);
  });

  describe('Fund Amount Error', () => {
    test('should create error message', () => {
      const message = `The amount must be less than or equal to ${convertToCurrency(1000)} (available bank money)`;
      expect(errorFundAmountMessage(1000)).toEqual(message);
    });
  });
});
