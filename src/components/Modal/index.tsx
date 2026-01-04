import { Modal, ModalProps } from 'antd';
import { ReactElement } from 'react';

interface BasicModalProps {
  isOpen: boolean;
  loading?: boolean;
  children: ReactElement;
  onSave?: () => void;
  onCancel: () => void
}

export const BasicModal = ({ isOpen, loading, children, onSave, onCancel, ...props }: BasicModalProps & ModalProps): JSX.Element => (
  <Modal
    destroyOnHidden={true}
    getContainer={false}
    loading={loading}
    open={isOpen}
    onOk={onSave}
    onCancel={onCancel}
    {...props}
  >
    {children}
  </Modal>
);
