import { LoanPayment } from '../../../../types/bank';
import {
  convertDateToString,
  TDate,
  today
} from '../../../../utils/date';
import {
  convertToPennies
} from '../../../../utils/fund';

export interface IFormValues {
  amount: number;
  date: TDate
}

export const createInitFormValues = (minAmount: number): IFormValues => {
  return {
    amount: minAmount,
    date: today
  };
};

export const createNewPayment = (values: IFormValues, loanId: number): LoanPayment => {
  return {
    loanId,
    amount: convertToPennies(values.amount),
    date: convertDateToString(values.date)
  };
};

export const updatePayment = (values: IFormValues, payment: LoanPayment): LoanPayment => {
  return {
    ...payment,
    amount: convertToPennies(values.amount),
    date: convertDateToString(values.date)
  };
};
