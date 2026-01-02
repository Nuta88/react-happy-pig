import { Tooltip as AntdTooltip } from 'antd';
import type { TooltipProps } from 'antd';

export const Tooltip = (props: TooltipProps): JSX.Element => (
  <AntdTooltip {...props} />
);
