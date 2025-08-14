import { TLoanCreate } from '../../../../../types/bank';
import {
  convertDateToString,
  TDate,
  today
} from '../../../../../utils/date';
import { convertToPennies } from '../../../../../utils/fund';

export interface IFormValues {
  name: string;
  description?: string;
  amount: number;
  paymentAmount: number;
  startDate: TDate
}

export const createInitFormValues = (): IFormValues => {
  return {
    name: '',
    amount: 1,
    paymentAmount: 1,
    startDate: today
  };
};

export const createNewLoan = (values: IFormValues): TLoanCreate => {
  return {
    name: values.name,
    description: values.description ?? '',
    amount: convertToPennies(values.amount),
    paymentAmount: convertToPennies(values.paymentAmount),
    startDate: convertDateToString(values.startDate)
  };
};
