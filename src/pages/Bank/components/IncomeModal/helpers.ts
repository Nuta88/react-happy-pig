import { IncomeSource } from '../../../../constants/bank';
import { Income } from '../../../../types';
import {
  convertDateToString,
  TDate
} from '../../../../utils/date';
import {
  convertToPennies
} from '../../../../utils/fund';

export interface IFormValues {
  source: keyof typeof IncomeSource;
  amount: number;
  date: TDate
}

export const createNewIncome = (values: IFormValues): Income => (
  new Income(values.source, convertToPennies(values.amount), convertDateToString(values.date))
);
