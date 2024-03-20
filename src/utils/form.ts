import { convertToCurrency } from './fund';

interface IFormError {
  name: string;
  errors: string[]
}

export const generateError = (fieldName: string, errors: string[]): IFormError => ({
  name: fieldName,
  errors
});

export const errorFundAmountMessage = (bankAmount: number): string => {
  return `The amount must be less than or equal to ${convertToCurrency(bankAmount)} (available bank money)`;
};
