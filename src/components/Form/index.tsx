import { Form as AntdForm } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import React, { forwardRef, PropsWithChildren } from 'react';

export type AppFormProps<T> = PropsWithChildren<FormProps<T>>;

export const Form = forwardRef(
  <T extends object>(
    props: AppFormProps<T>,
    ref: React.Ref<FormInstance<T>>
  ): JSX.Element => {
    return <AntdForm<T> ref={ref} {...props} />;
  }
);

Form.displayName = 'Form';
