import { Modal, ModalProps } from 'antd';
import { ReactElement } from 'react';

import { LoadingSubmitButton } from '../Buttons/LoadingSubmitButton';

interface BasicModalProps {
  buttonTitle: string;
  isOpen: boolean;
  loading?: boolean;
  children: ReactElement;
  onSave?: () => void;
  onCancel: () => void
}

export const BasicModal = ({ buttonTitle, isOpen, loading, children, onSave, onCancel, ...props }: BasicModalProps & ModalProps): JSX.Element => (
  <Modal
    destroyOnHidden={true}
    getContainer={false}
    open={isOpen}
    onOk={onSave}
    onCancel={onCancel}
    footer={[
      <LoadingSubmitButton
        key="submit"
        disabled={loading}
        onClick={onSave}
        isLoading={loading}
      >
        {buttonTitle}
      </LoadingSubmitButton>
    ]}
    {...props}
  >
    {children}
  </Modal>
);
