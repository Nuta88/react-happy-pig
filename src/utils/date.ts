import dayjs from 'dayjs';

import { dateFormat } from '../constants/common';

export type TDate = string | number | Date | dayjs.Dayjs | null | undefined;
export type TParseDate = string | dayjs.Dayjs;

export const convertDateToString = (date: TDate): string => dayjs(date).format(dateFormat);

export const disablePreviousDate = (currentDate: TDate): boolean => !dayjs().isAfter(dayjs(currentDate));

export const parseDate = (date: TDate, format?: dayjs.OptionType): TParseDate => dayjs(date, format ?? dateFormat);
