import { ReactNode } from 'react';

import { Tooltip } from '../Tooltip';

import { CircleButton } from './CircleButton';
import { ButtonProps } from './types';

interface IMainCircleButton {
  tooltip: string;
  size?: string;
  icon?: ReactNode
}

export const TooltipIconButton = ({ tooltip, size = 'large', ...props }: IMainCircleButton & ButtonProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <CircleButton
      size={size}
      type="primary"
      {...props}
    />
  </Tooltip>
);
