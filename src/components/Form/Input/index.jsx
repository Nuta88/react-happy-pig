import { Input as SimpleInput, InputNumber, DatePicker } from 'antd';

const { TextArea } = SimpleInput;

export const Input = ({ type, ...props }) => {
  switch (type) {
    case 'number': return <InputNumber {...props} />;
    case 'textarea': return <TextArea {...props} />;
    case 'datepicker': return <DatePicker {...props} />;
    default: return <SimpleInput {...props} />;
  }
};
