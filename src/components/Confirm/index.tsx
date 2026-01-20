import { Popconfirm, PopconfirmProps } from 'antd';

import { InlineSpanStyled } from '../styles';

export const Confirm = ({
  children,
  ...props
}: PopconfirmProps): JSX.Element => {
  return (
    <Popconfirm
      okText="Yes"
      cancelText="No"
      motion={{ motionEnter: false }}
      onCancel={(e) => e?.stopPropagation()}
      {...props}
    >
    <InlineSpanStyled>
      {children}
    </InlineSpanStyled>
    </Popconfirm>
  );
};
