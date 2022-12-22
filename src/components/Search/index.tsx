import { RefAttributes } from 'react';
import { Input, InputProps, InputRef } from 'antd';

const { Search: AntdSearch } = Input;

export const Search = (props: JSX.IntrinsicAttributes & InputProps & RefAttributes<InputRef>) => (
  <AntdSearch {...props} />
);
