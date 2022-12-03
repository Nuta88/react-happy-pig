import dayjs from 'dayjs';

import { dateFormat } from '../constants/common';

export const convertDateToString = date => dayjs(date).format(dateFormat);

export const disablePreviousDate = currentDate => {
  return !dayjs().isAfter(dayjs(currentDate));
};

export const parseDate = (date, format) => dayjs(date, format);
