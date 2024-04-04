import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import { RefAttributes } from 'react';

const { Text: AntdText } = Typography;

export const Text = (props: JSX.IntrinsicAttributes & TitleProps & RefAttributes<HTMLElement>): JSX.Element => (
  <AntdText level={5} {...props} />
);
