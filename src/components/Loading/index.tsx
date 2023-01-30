import { Spin, SpinProps } from 'antd';

export const Loading = (props: JSX.IntrinsicAttributes & SpinProps): JSX.Element => (
  <Spin tip="Loading" size="large" {...props} />
);
