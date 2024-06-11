import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  CircleButton,
  ColumnsType,
  Confirm,
  DeleteIcon,
  SpaceBetween
} from '../../components';
import { TNotification } from '../../types/columns';
import { onWrapQuery } from '../../utils/query';

type TDelete = (id: string) => Promise<{ data: string[] } | { error: FetchBaseQueryError | SerializedError }>;

interface TagColumn {
  name: string
}

export const generateColumns = (openNotification: TNotification, onDeleteTag: TDelete): ColumnsType<any> => [
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
        onWrapQuery(
          onDeleteTag(tag.name),
          `Tag "${tag.name}" was deleted successfully!`,
          openNotification
        );
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
