import { ReactNode, Ref } from 'react';
import { Table as AntdTable, TableProps } from 'antd';

export const Table = (props: JSX.IntrinsicAttributes & TableProps<any> & { children?: ReactNode; } & { ref?: Ref<HTMLDivElement> | undefined; }) => (
  <AntdTable {...props} />
);
