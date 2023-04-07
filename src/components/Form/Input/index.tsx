import {
  Input as SimpleInput,
  InputNumber,
  DatePicker,
  InputRef
} from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import { TextAreaProps, PasswordProps, InputProps } from 'antd/es/input';
import { InputNumberProps } from 'antd/es/input-number';
import { RefAttributes } from 'react';

import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const { TextArea } = SimpleInput;

interface IInput {
  type?: string
}

type TInput = IInput & PasswordProps & TextAreaProps & DatePickerProps & JSX.IntrinsicAttributes & InputProps & RefAttributes<InputRef>;

export const Input = ({ type, ...props }: TInput): JSX.Element => {
  switch (type) {
    case 'number': return <InputNumber {...props as InputNumberProps} />;
    case 'textarea': return <TextArea {...props} />;
    case 'datepicker': return <DatePicker {...props as DatePickerProps} />;
    case 'password': return <PasswordInput {...props} />;
    default: return <TextInput {...props} />;
  }
};
