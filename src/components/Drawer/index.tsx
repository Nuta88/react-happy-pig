import type { DrawerProps } from 'antd';
import { Drawer as DrawerAntd } from 'antd';
import { FC } from 'react';

export const Drawer: FC<DrawerProps> = (props) => {
  return (
    <DrawerAntd {...props}/>
  );
};
