import { Form } from 'antd';

import {
  AuthForm,
  TextInput,
  PasswordInput,
  AvatarIcon,
  LockIcon,
  MailIcon
} from '../../components';
import { useAuth } from '../../hooks';

const Register = (): JSX.Element => {
  const { onRegister } = useAuth();

  return (
    <AuthForm
      title="Register"
      redirectTitle="Back to login page"
      redirectTo="/login"
      onSave={onRegister}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Please input your User name!' } ]}>
        <TextInput
          size="large"
          placeholder="Username"
          prefix={<AvatarIcon />}
        />
      </Form.Item>
      <Form.Item name="email" rules={[ { required: true, type: 'email' } ]}>
        <TextInput
          placeholder="Email"
          size="large"
          prefix={<MailIcon />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[ { required: true, message: 'Please input your Password!' } ]}
      >
        <PasswordInput
          type="password"
          size="large"
          prefix={<LockIcon />}
          placeholder="Password"
        />
      </Form.Item>
    </AuthForm>
  );
};

export default Register;
