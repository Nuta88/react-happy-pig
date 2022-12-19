import { Button } from 'antd';
import { ButtonProps } from './types';

export const CircleButton = (
  props: ButtonProps
) => (
  <Button shape="circle" {...props} />
);
