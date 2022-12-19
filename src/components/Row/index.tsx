import { RefAttributes } from 'react';
import { Row as AntdRow, RowProps} from 'antd';

export const Row = (props: JSX.IntrinsicAttributes & RowProps & RefAttributes<HTMLDivElement>) => <AntdRow {...props} />;
