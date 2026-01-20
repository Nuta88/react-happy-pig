import type { ButtonProps } from 'antd';
import { ReactNode } from 'react';

import { Tooltip } from '../Tooltip';

import { CircleButton } from './CircleButton';

interface IMainCircleButton {
  tooltip: string;
  size?: string;
  icon?: ReactNode;
  isPreventDefault?: boolean
}

export const TooltipIconButton = ({ tooltip, size = 'large', ...props }: IMainCircleButton & ButtonProps): JSX.Element => {
  const onClickButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
  };

  return (
    <Tooltip title={tooltip}>
      <CircleButton
        size={size}
        type="primary"
        onClick={onClickButton}
        {...props}
      />
    </Tooltip>
  );
};
