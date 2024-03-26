import { convertToCurrency } from './fund';

interface IFormError {
  name: string;
  errors: string[]
}

export const generateError = (fieldName: string, errors: string[]): IFormError => ({
  name: fieldName,
  errors
});

export const errorBankAmountMessage = (bankAmount: number): string => {
  return `Available money of the bank is equal to ${convertToCurrency(bankAmount)}$`;
};
export const errorFundAmountMessage = (expenseAmount: number): string => {
  return `Available money of the fund is equal to ${convertToCurrency(expenseAmount)}$`;
};
