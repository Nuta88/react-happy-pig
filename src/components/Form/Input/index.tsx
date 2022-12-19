import {Input as SimpleInput, InputNumber, DatePicker, InputProps } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import { DatePickerProps } from 'antd/es/date-picker';
import { TextAreaProps } from "antd/es/input";

const { TextArea } = SimpleInput;

type TInput = {
  type?: string,
}

export const Input = ({ type, ...props }: TInput & InputNumberProps & DatePickerProps & InputProps & TextAreaProps) => {
  switch (type) {
    case 'number': return <InputNumber {...props} />;
    case 'textarea': return <TextArea {...props} />;
    case 'datepicker':
      return <DatePicker {...props} />;
    default: return <SimpleInput {...props} />;
  }
};
