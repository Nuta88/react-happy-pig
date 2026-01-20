import {
  DatePicker,
  Input as SimpleInput,
  InputNumber
} from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import {
  PasswordProps,
  TextAreaProps
} from 'antd/es/input';
import { InputNumberProps } from 'antd/es/input-number';

import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const { TextArea } = SimpleInput;

export const Input = ({ type, ...props }: any): JSX.Element => {
  switch (type) {
    case 'currency': return <InputNumber suffix="$" {...props as InputNumberProps} />;
    case 'number': return <InputNumber {...props as InputNumberProps} />;
    case 'textarea': return <TextArea {...props as TextAreaProps} />;
    case 'datepicker': return <DatePicker {...props as DatePickerProps} />;
    case 'password': return <PasswordInput {...props as PasswordProps} />;
    default: return <TextInput {...props} />;
  }
};
