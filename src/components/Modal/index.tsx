import { ReactElement } from 'react';
import { Modal, ModalProps } from 'antd';

type BasicModalProps = {
  title: string,
  isOpen: boolean,
  children: ReactElement,
  onSave?: () => void,
  onCancel: () => void
}

export const BasicModal = ({ title, isOpen, children, onSave, onCancel, ...props }: BasicModalProps & ModalProps) => (
  <Modal
    title={title}
    open={isOpen}
    onOk={onSave}
    onCancel={onCancel}
    {...props}
  >
    {children}
  </Modal>
)