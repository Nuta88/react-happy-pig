import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  CircleButton,
  ColumnsType,
  Confirm,
  DeleteIcon,
  SpaceBetween
} from '../../components';

type TDelete = (id: string) => Promise<{ data: string[] } | { error: FetchBaseQueryError | SerializedError }>;

interface TagColumn {
  name: string
}

export const generateColumns = (onDeleteTag: TDelete): ColumnsType<any> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: (_, tag: TagColumn) => {
      const handleDelete = (): void => {
        void onDeleteTag(tag.name);
      };
      return (
        <SpaceBetween size="middle">
          <Confirm
            title={`Are you sure to delete "${tag.name}" tag?`}
            placement="leftTop"
            onConfirm={handleDelete}
          >
            <CircleButton type="primary" icon={<DeleteIcon />} data-testid="delete-income-btn" />
          </Confirm>
        </SpaceBetween>
      );
    }
  }
];
