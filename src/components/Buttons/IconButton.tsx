import type { ButtonProps } from 'antd';
import { ReactNode } from 'react';

import { CircleButton } from './CircleButton';

interface IconButtonProps {
  icon: ReactNode
}

export const IconButton = ({ icon, ...props }: IconButtonProps & ButtonProps): JSX.Element => (
  <CircleButton icon={icon} {...props} />
);
