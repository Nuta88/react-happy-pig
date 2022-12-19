import { Popconfirm, PopconfirmProps } from 'antd';

export const Confirm = (props: PopconfirmProps) => (
  <Popconfirm okText="Yes" cancelText="No" {...props} />
);
