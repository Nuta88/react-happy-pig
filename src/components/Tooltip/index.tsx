import { Tooltip as AntdTooltip } from 'antd';
import type { TooltipProps } from 'antd';

import { InlineSpanStyled } from '../styles';

export const Tooltip = ({
  children,
  ...props
}: TooltipProps): JSX.Element => (
  <AntdTooltip motion={{ motionEnter: false }} {...props}>
    <InlineSpanStyled>
      {children}
    </InlineSpanStyled>
  </AntdTooltip>
);
