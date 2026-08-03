import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { forwardRef } from 'react';

type ButtonRef = React.ElementRef<typeof Button>;

export const TextButton = forwardRef<ButtonRef, ButtonProps>(
  (props, ref) => (
    <Button
      {...props}
      ref={ref}
      type="text"
    />
  )
);

TextButton.displayName = 'TextButton';
