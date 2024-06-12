import type { DividerProps } from 'antd';
import { Divider as DividerAntd } from 'antd';
import { FC } from 'react';

export const Divider: FC<DividerProps> = (props) => {
  return (
    <DividerAntd {...props}/>
  );
};
