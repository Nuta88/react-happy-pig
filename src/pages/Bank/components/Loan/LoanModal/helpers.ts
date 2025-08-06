import { TLoanCreate } from '../../../../../types/bank';
import {
  convertDateToString,
  TDate,
  today
} from '../../../../../utils/date';
import { convertToPennies } from '../../../../../utils/fund';

export interface IFormValues {
  amount: number;
  paymentAmount: number;
  startDate: TDate
}

export const createInitFormValues = (): IFormValues => {
  return {
    amount: 1,
    paymentAmount: 1,
    startDate: today
  };
};

export const createNewLoan = (values: IFormValues): TLoanCreate => {
  return {
    amount: convertToPennies(values.amount),
    paymentAmount: convertToPennies(values.paymentAmount),
    startDate: convertDateToString(values.startDate)
  };
};
