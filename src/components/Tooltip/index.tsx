import { Tooltip as AntdTooltip, TooltipProps } from 'antd';
import {RefAttributes} from 'react';

export const Tooltip = (props: JSX.IntrinsicAttributes & (TooltipProps & RefAttributes<unknown>)) => (
  <AntdTooltip {...props} />
);
