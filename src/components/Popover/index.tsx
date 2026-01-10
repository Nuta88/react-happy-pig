import { Popover as AntdPopover } from 'antd';
import type { PopoverProps } from 'antd';

export const Popover: React.FC<PopoverProps> = (props): JSX.Element => (
  <AntdPopover {...props} />
);
