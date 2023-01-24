import { Table as AntdTable, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactNode, Ref } from 'react';

const Table = (props: JSX.IntrinsicAttributes & TableProps<any> & { children?: ReactNode } & { ref?: Ref<HTMLDivElement> | undefined }): JSX.Element => (
  <AntdTable {...props} />
);

export { Table, ColumnsType };
