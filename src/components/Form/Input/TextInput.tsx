import { RefAttributes } from 'react';
import { Input, InputProps, InputRef } from 'antd';

const TextInput = (props: JSX.IntrinsicAttributes & InputProps & RefAttributes<InputRef>) => <Input {...props} />;

export default TextInput;
