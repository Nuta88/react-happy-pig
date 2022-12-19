import { RefAttributes } from 'react';
import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';

const {Title: AntdTitle} = Typography;

export const Title = (props: JSX.IntrinsicAttributes & TitleProps & RefAttributes<HTMLElement>) => (
  <AntdTitle level={2} {...props} />
);
