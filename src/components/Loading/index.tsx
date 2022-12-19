import { Spin, SpinProps} from 'antd';

export const Loading = (props: JSX.IntrinsicAttributes & SpinProps) => <Spin tip="Loading" size="large" {...props} />;
