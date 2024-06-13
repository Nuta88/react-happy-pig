import type { DatePickerProps } from 'antd';
import { DatePicker as DatePickerAntd } from 'antd';
import { FC } from 'react';

export const DatePicker: FC<DatePickerProps> = (props) => {
  return (
    <DatePickerAntd {...props}/>
  );
};
