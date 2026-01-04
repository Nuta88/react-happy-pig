import type { DrawerProps } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

import { Drawer } from '../Drawer';

import { InfoActions } from './components/InfoActions';

const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 1.5rem 1.5rem;
  }
`;

interface InfoProps extends DrawerProps {
  isEdit: boolean;
  isChanged: boolean;
  onHideEdit: () => void;
  onEdit: () => void;
  onSubmit: () => void
}

export const Info: FC<InfoProps> = ({
  onSubmit,
  isEdit,
  isChanged,
  onEdit,
  onHideEdit,
  ...props
}): JSX.Element => {
  return (
    <DrawerStyled
      size={500}
      placement="right"
      extra={
        <InfoActions
          isEdit={isEdit}
          isChanged={isChanged}
          onHideEdit={onHideEdit}
          onEdit={onEdit}
          onSubmit={onSubmit}
        />
      }
      {...props}
      />
  );
};
