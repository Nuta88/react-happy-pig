import type { AutoCompleteProps } from 'antd';
import { AutoComplete as AutoCompleteAntd } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { FC } from 'react';

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  return (
    <AutoCompleteAntd {...props}/>
  );
};

export { AutoComplete, DefaultOptionType };
