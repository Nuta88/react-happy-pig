import { Button as ButtonAntd } from 'antd';
import type { ButtonProps } from 'antd';

export const Button = (
  props: ButtonProps
): JSX.Element => (
  <ButtonAntd {...props} />
);
