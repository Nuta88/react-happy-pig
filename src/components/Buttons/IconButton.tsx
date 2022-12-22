import { ReactNode } from 'react';

import { ButtonProps } from './types';
import { CircleButton } from './CircleButton';

interface IconButtonProps {
  icon: ReactNode;
}

export const IconButton = ({icon, ...props}: IconButtonProps & ButtonProps) => (
  <CircleButton icon={icon} {...props} />
);
