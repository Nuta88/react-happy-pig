import { RefAttributes } from 'react';
import { Col as AntdCol, ColProps} from 'antd';

export const Col = (props: JSX.IntrinsicAttributes & ColProps & RefAttributes<HTMLDivElement>) => <AntdCol {...props} />;
