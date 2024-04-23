import { Button } from 'antd';

import { ButtonProps } from './types';

export const PrimaryButton = (
  props: ButtonProps
): JSX.Element => (
  <Button type="primary" {...props} />
);
