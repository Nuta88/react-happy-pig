import { List } from 'antd';
import {
  FC,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  AddIcon,
  DashedButton,
  Drawer,
  Empty,
  Form,
  Input,
  Link,
  LinkIcon,
  MinusCircleIcon,
  Radio,
  SecondaryText,
  Text
} from '../../../../components';
import { FundPriority } from '../../../../constants/fund';
import { Fund } from '../../../../types';
import { IFundInfo } from '../../../../types/fund';
import { disablePreviousDate } from '../../../../utils/date';
import { getAmount } from '../../../../utils/fund';
import { isObjectEmpty } from '../../../../utils/object';

import { FundInfoActions } from './components/FundInfoActions';
import {
  convertFormValuesToFund,
  createInitialValues
} from './helpers';

const MinusIconStyled = styled(MinusCircleIcon)`
  margin-left: .5rem;
`;

const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 1.5rem 1.5rem;
  }
`;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 }
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: { span: 32, offset: 6 }
  }
};

interface InfoProps {
  fund: Fund | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (info: IFundInfo) => void
}

export const FundInfo: FC<InfoProps> = ({ open, fund, onClose, onSave }): JSX.Element => {
  const [ isEdit, setIsEdit ] = useState(false);
  const [ form ] = Form.useForm();
  const priorityOptions = Object.entries(FundPriority);
  const initialValues = createInitialValues(fund);
  const [ isChanged, setIsChanged ] = useState(false);
  const watchedValues = Form.useWatch([], form); // watch all form values

  useEffect(() => {
    const currentValues = form.getFieldsValue(true);

    if (!isObjectEmpty(currentValues)) {
      setIsChanged(JSON.stringify(currentValues) !== JSON.stringify(initialValues));
    }
  }, [ watchedValues ]);

  const handleEdit = (): void => {
    form.setFieldsValue(initialValues);
    setIsEdit(true);
  };

  const handleHideEdit = (): void => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleClose = (): void => {
    setIsEdit(false);
    onClose();
    form.resetFields();
  };

  const handleUpdateFund = (values: IFundInfo): void => {
    onSave(convertFormValuesToFund(values));
    handleHideEdit();
  };

  return (
    <DrawerStyled
      title="Fund info"
      placement="right"
      width={500}
      extra={
        <FundInfoActions
          isEdit={isEdit}
          isChanged={isChanged}
          onHideEdit={handleHideEdit}
          onEdit={handleEdit}
          onSubmit={form.submit}
        />
      }
      onClose={handleClose}
      open={open}
    >
      <>
        {isEdit
          ? (
            <Form
              form={form}
              {...layout}
              autoComplete="off"
              onFinish={handleUpdateFund}
            >
              <Form.Item
                name="priority"
                label="Priority"
                rules={[
                  { required: true, message: 'Please input priority!' }
                ]}
              >
                <Radio.Group>
                  {priorityOptions.map(([ key, value ]) => (
                    <Radio key={key} value={key}> {value.toLowerCase()} </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Date"
                name="creationDate"
                data-testid="creationDate"
                rules={[ { required: true, message: 'Please input date!' } ]}
              >
                <Input type="datepicker" disabledDate={disablePreviousDate} />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                data-testid="description"
              >
                <Input type="textarea" rows={2} />
              </Form.Item>
              <Form.List
                name="links"
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        label={index === 0 ? 'Links' : ''}
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={[ 'onChange', 'onBlur' ]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input link's name or delete this field."
                            }
                          ]}
                          noStyle
                        >
                          <Input placeholder="link name" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length
                          ? (
                            <MinusIconStyled
                              onClick={() => { remove(field.name); }}
                            />
                            )
                          : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <DashedButton
                        onClick={() => { add(); }}
                        icon={<AddIcon />}
                      >
                        Add link
                      </DashedButton>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
            )
          : (
            <>
              <p>
                <Text>Received Amount:</Text> <SecondaryText>{getAmount(fund?.receivedAmount)}</SecondaryText>
              </p>
              <p>
                <Text>Priority:</Text> <SecondaryText>{fund?.priority}</SecondaryText>
              </p>
              <p>
                <Text>Date:</Text> <SecondaryText>{fund?.creationDate}</SecondaryText>
              </p>
              <p>
                <Text>Description:</Text> <SecondaryText>{fund?.description}</SecondaryText>
              </p>
              <List
                size="small"
                header={<div>Links:</div>}
                dataSource={fund?.links}
                renderItem={(item) => (
                  <List.Item>
                    {item
                      ? <Link href={item} target="_blank"><LinkIcon /> {item}</Link>
                      : <Empty description="No links" />
                    }
                  </List.Item>
                )}
              />
            </>
            )
        }
      </>
    </DrawerStyled>
  );
};
