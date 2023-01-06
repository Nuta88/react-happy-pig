import { Button as ButtonAntd } from 'antd';
import { ButtonProps } from './types';

export const Button = (
  props: ButtonProps
) => (
  <ButtonAntd {...props} />
);
