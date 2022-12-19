import { RefAttributes } from 'react';
import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';

const {Text} = Typography;

export const SecondaryText = (props: JSX.IntrinsicAttributes & TextProps & RefAttributes<HTMLSpanElement>) => (
  <Text type="secondary" {...props} />
);
