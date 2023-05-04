import { Form } from 'antd';
import { ReactNode, FC } from 'react';
import styled from 'styled-components';

import { SubmitButton } from '../../Buttons/SubmitButton';
import { Link } from '../../Typography/Link';
import { Title } from '../../Typography/Title';

const TitleStyled = styled(Title)`
  margin: 0 0 1rem;
  font-size: 20px;
  text-align: center;
  color: #1c3463e0!important;
`;

const ButtonStyled = styled(SubmitButton)`
  margin-bottom: 1rem;
`;

interface IPageProps {
  title: string | ReactNode;
  redirectTitle: string;
  redirectTo: string;
  children: ReactNode;
  onSave: (user: any) => void
}

export const AuthForm: FC<IPageProps> = ({
  title,
  redirectTitle,
  redirectTo,
  onSave,
  children
}) => {
  const [ form ] = Form.useForm();

  return (
    <>
      <TitleStyled>
        {title}
      </TitleStyled>
      <Form
        form={form}
        onFinish={onSave}
        name="auth"
        autoComplete="off"
      >
        {children}
        <Form.Item>
          <ButtonStyled>
            Submit
          </ButtonStyled>
          <Link href={redirectTo}>
            {redirectTitle}
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};
