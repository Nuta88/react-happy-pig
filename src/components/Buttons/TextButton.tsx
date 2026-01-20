import type { ButtonProps } from 'antd';

import { Button } from './index';

export const TextButton = (
  props: ButtonProps
): JSX.Element => (
  <Button type="text" {...props} />
);
