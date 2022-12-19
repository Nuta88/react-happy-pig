import dayjs from 'dayjs';

import { dateFormat } from '../constants/common';

export type TDate = string | number | Date | dayjs.Dayjs | null | undefined;

export const convertDateToString = (date: TDate) => dayjs(date).format(dateFormat);

export const disablePreviousDate = (currentDate: TDate): boolean => !dayjs().isAfter(dayjs(currentDate));

export const parseDate = (date: TDate, format?: dayjs.OptionType) => dayjs(date, format || dateFormat);
