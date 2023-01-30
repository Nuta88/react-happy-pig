import dayjs from 'dayjs';

import { dateFormat } from '../constants/common';

import {
  convertDateToString,
  parseDate,
  disablePreviousDate
} from './date';

describe('Date util tests', () => {
  test('should convert date to string', () => {
    const date = '2022-12-03';

    expect(convertDateToString(parseDate(date, dateFormat))).toEqual(date);
  });

  describe('Previous Date', () => {
    test('should not disable previous date', () => {
      expect(disablePreviousDate(parseDate('2021-12-03', dateFormat))).toBeFalsy();
    });

    test('should disable futures date', () => {
      const tomorrow = dayjs().add(1, 'day');

      expect(disablePreviousDate(tomorrow)).toBeTruthy();
    });
  });
});
