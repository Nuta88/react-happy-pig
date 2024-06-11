import { useCallback } from 'react';

import {
  AddIcon,
  ColumnsType,
  Page,
  Table,
  TooltipIconButton
} from '../../components';
import {
  useModal,
  useNotification
} from '../../hooks';
import {
  useDeleteTagMutation,
  useFetchTagQuery
} from '../../services/tags';

import { generateColumns } from './columns';
import TagModal from './components/TagModal';

const Bank = (): JSX.Element => {
  const { notificationContext, openNotification } = useNotification();
  const { isOpenModal, hideModal, openModal } = useModal();
  const { data: tags = [], isLoading } = useFetchTagQuery(undefined, { refetchOnMountOrArgChange: true });
  const [ deleteTag ] = useDeleteTagMutation({});
  const columns: ColumnsType<string[]> = generateColumns(openNotification, deleteTag);

  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, [ openModal ]);

  return (
    <Page
      title="Tags"
      data-testid="bank-page-content"
      extra={
        <TooltipIconButton
          tooltip="Add tag"
          size="large"
          icon={<AddIcon />}
          data-testid="create-tag-btn"
          onClick={handleOpenCreateModal}
        />
      }
    >
      {notificationContext}
      <Table
        rowKey="id"
        size="small"
        scroll={{ y: 350 }}
        loading={isLoading}
        columns={columns}
        dataSource={tags.map(tag => ({ name: tag, id: tag }))}
      />
      {isOpenModal && (
        <TagModal
          isOpen={isOpenModal}
          onCancel={hideModal}
          openNotification={openNotification}
        />
      )}
    </Page>
  );
};

export default Bank;
