import type { AutoCompleteProps } from 'antd';
import { AutoComplete as AutoCompleteAntd } from 'antd';
import { FC } from 'react';

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  return (
    <AutoCompleteAntd {...props}/>
  );
};
