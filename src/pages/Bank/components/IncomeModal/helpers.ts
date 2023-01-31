import { IncomeSource } from '../../../../constants/bank';
import { dateFormat } from '../../../../constants/common';
import { Income } from '../../../../types';
import {
  convertDateToString,
  parseDate,
  TDate,
  today
} from '../../../../utils/date';
import {
  convertToCurrency,
  convertToPennies
} from '../../../../utils/fund';

export interface IFormValues {
  source: keyof typeof IncomeSource | null;
  amount: number;
  date: TDate
}

export const convertIncomeToFormValues = (income: Income): IFormValues => {
  return {
    ...income,
    amount: convertToCurrency(income.amount),
    date: parseDate(income.date, dateFormat)
  };
};

export const createInitFormValues = (income: Income | null): IFormValues => {
  if (income) return convertIncomeToFormValues(income);

  return {
    source: null,
    amount: 0,
    date: today
  };
};

export const createNewIncome = (values: IFormValues): Income => (
  new Income(
    values.source as keyof typeof IncomeSource,
    convertToPennies(values.amount),
    convertDateToString(values.date))
);

export const updateSelectedIncome = (values: IFormValues, income: Income): Income => (
  {
    ...income,
    amount: convertToPennies(values.amount),
    date: convertDateToString(values.date)
  }
);
