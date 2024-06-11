import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input
} from '../../../../components';
import { layout } from '../../../../constants/form';
import { useCreateTagMutation } from '../../../../services/tags';
import { NotificationType } from '../../../../types/notification';
import { onWrapQuery } from '../../../../utils/query';

interface ITagModalProps {
  isOpen: boolean;
  onCancel: () => void;
  openNotification: (type: NotificationType, content: string) => void
}

interface FormValues {
  name: string
}

const TagModal: FC<ITagModalProps> = ({ isOpen, onCancel, openNotification }) => {
  const title: string = 'Add new tag';
  const [ createTag ] = useCreateTagMutation({});
  const initialValues = {};
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: FormValues): void => {
    onWrapQuery(
      createTag(values.name.toLowerCase()),
      `Tag "${values.name}" was created successfully!`,
      openNotification,
      onCloseModal
    );
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText={'Save'}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="income-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          data-testid="name"
          rules={[
            { required: true, message: 'Please input name!' },
            {
              type: 'string',
              min: 2,
              max: 50,
              message: 'Recipient must be from 2 characters to 50 characters!'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(TagModal);
