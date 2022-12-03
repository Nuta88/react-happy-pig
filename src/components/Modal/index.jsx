import { Modal } from 'antd';

export const BasicModal = ({ title, isOpen, children, onSave, onCancel, ...props }) => (
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