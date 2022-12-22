import { ReactNode, Ref } from 'react';
import { Table as AntdTable, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const Table = (props: JSX.IntrinsicAttributes & TableProps<any> & { children?: ReactNode; } & { ref?: Ref<HTMLDivElement> | undefined; }) => (
  <AntdTable {...props} />
);

export { Table, ColumnsType };
