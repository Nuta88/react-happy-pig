import { dateFormat } from '../../../../constants/common';
import { Fund } from '../../../../types';
import { IFundInfo } from '../../../../types/fund';
import {
  convertDateToString,
  parseDate,
  TDate
} from '../../../../utils/date';

interface InitialFormValues {
  description?: string | null;
  links: string[];
  priority: string;
  creationDate: TDate
}

export const createInitialValues = (fund: Fund | undefined): InitialFormValues => {
  const { description, links = [], priority = '', creationDate } = fund ?? {};
  return { description, links, priority, creationDate: parseDate(creationDate, dateFormat) };
};

export const convertFormValuesToFund = (values: InitialFormValues): IFundInfo => {
  const date = convertDateToString(values.creationDate);

  return { ...values, creationDate: date };
};
