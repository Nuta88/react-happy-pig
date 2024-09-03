import { Popover as AntdPopover, PopoverProps } from 'antd';
import { RefAttributes } from 'react';

export const Popover = (props: JSX.IntrinsicAttributes & PopoverProps & RefAttributes<HTMLDivElement>): JSX.Element => (
  <AntdPopover {...props} />
);
