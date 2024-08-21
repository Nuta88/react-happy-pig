import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';
import styled from 'styled-components';

import {
  BasicModal,
  Select,
  SelectOption
} from '../../../../components';
import { layout } from '../../../../constants/form';
import {
  Expense,
  Fund
} from '../../../../types';
import { useMovingExpense } from '../../hooks/useMovingExpense';

const FundNameStyled = styled.span`
    display: block;
    &:first-letter {
      text-transform: uppercase;
    }
`;

interface IExpenseModalProps {
  isOpen: boolean;
  expense: Expense | null;
  fundId: number | null | undefined;
  onCancel: () => void
}

const MoveExpenseModal: FC<IExpenseModalProps> = ({ isOpen, expense, fundId, onCancel }) => {
  const [ form ] = Form.useForm();
  const { funds, initialValues, onMovingExpense, onCloseModal } = useMovingExpense({
    fundId,
    expense,
    resetFields: form.resetFields,
    onCancel
  });

  return (
    <BasicModal
      title="Move expense"
      isOpen={isOpen}
      okText="Move"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <>
        <Form
          form={form}
          {...layout}
          initialValues={initialValues}
          name="move-expense-modal"
          autoComplete="off"
          onFinish={onMovingExpense}
        >
          <Form.Item
            label="Fund"
            name="fundId"
            data-testid="recipient"
            rules={[
              { required: true, message: 'Please select fund!' }
            ]}
          >
            <Select
              placeholder="Select new fund"
              allowClear
            >
              {funds.map((fund: Fund) => (
                <SelectOption
                  key={fund.id}
                  value={fund.id}
                >
                  <FundNameStyled>{fund.name}</FundNameStyled>
                  </SelectOption>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </>
    </BasicModal>
  );
};

export default memo(MoveExpenseModal);
