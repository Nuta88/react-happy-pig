import type { TabsProps } from 'antd';
import { Tabs as TabsAntd } from 'antd';
import { FC } from 'react';

export const Tabs: FC<TabsProps> = (props) => {
  return (
    <TabsAntd {...props}/>
  );
};
