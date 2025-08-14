import { dateFormat } from '../../../../constants/common';
import { ILoan } from '../../../../types/bank';
import {
  convertDateToString,
  parseDate,
  TParseDate
} from '../../../../utils/date';
import {
  convertToCurrency,
  convertToPennies
} from '../../../../utils/fund';

export interface InitialValues {
  description: string;
  startDate: TParseDate;
  paymentAmount: number
}

export const createInitialValues = (description: string = '', startDate: string = '', paymentAmount: number = 0): InitialValues => ({
  description,
  startDate: parseDate(startDate, dateFormat),
  paymentAmount: convertToCurrency(paymentAmount)
});

export const getLoanWithUpdatedValues = (loan: ILoan, values: InitialValues): ILoan => {
  return {
    ...loan,
    description: values.description,
    startDate: convertDateToString(values.startDate),
    paymentAmount: convertToPennies(values.paymentAmount)
  };
};
