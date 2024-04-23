import { ReactNode } from 'react';

import { Tooltip } from '../Tooltip';

import { CircleButton } from './CircleButton';
import { ButtonProps } from './types';

interface IMainCircleButton {
  tooltip: string;
  icon?: ReactNode
}

export const TooltipIconButton = ({ tooltip, ...props }: IMainCircleButton & ButtonProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <CircleButton
      size="large"
      type="primary"
      {...props}
    />
  </Tooltip>
);
