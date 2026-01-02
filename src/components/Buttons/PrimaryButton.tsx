import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export const PrimaryButton = (
  props: ButtonProps
): JSX.Element => (
  <Button type="primary" {...props} />
);
