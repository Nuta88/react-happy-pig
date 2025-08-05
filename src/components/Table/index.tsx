import { Table as AntdTable, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactNode, Ref } from 'react';
import styled from 'styled-components';

const TableStyled = styled(AntdTable)`
  .ant-spin-container {
    display: flex;
    flex-direction: column;
  }
  .ant-table {
    flex-grow: 1;
    .ant-table-title {
      padding: 0 0 .6rem;
      text-transform: uppercase;
      color: #1c3463e0;
      & * {
        color: #1c3463e0;
      }
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      padding: 1rem!important;
      background: #7b91bc21;
      color: #384d76;
    }
  }
`;

const Table = (props: JSX.IntrinsicAttributes & TableProps<any> & { children?: ReactNode } & { ref?: Ref<HTMLDivElement> | undefined }): JSX.Element => (
  <TableStyled {...props} />
);

export { Table, ColumnsType };
