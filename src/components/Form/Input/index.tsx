import { Input as SimpleInput, InputNumber, DatePicker, InputProps } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import { TextAreaProps } from 'antd/es/input';
import { InputNumberProps } from 'antd/es/input-number';

import TextInput from './TextInput';

const { TextArea } = SimpleInput;

interface TInput {
  type?: string
}

export const Input = ({ type, ...props }: TInput & InputNumberProps & DatePickerProps & InputProps & TextAreaProps): JSX.Element => {
  switch (type) {
    case 'number': return <InputNumber {...props} />;
    case 'textarea': return <TextArea {...props} />;
    case 'datepicker': return <DatePicker {...props} />;
    default: return <TextInput {...props} />;
  }
};
