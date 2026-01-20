import { Table as AntdTable } from 'antd';
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

const TableStyled = styled(AntdTable as React.ComponentType<TableProps<any>>)`
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

const Table: React.FC<TableProps<any>> = (props): JSX.Element => (
  <TableStyled {...props} />
);

export { Table, ColumnsType };
