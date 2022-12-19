import { Layout } from 'antd';
import styled from 'styled-components';

import { AvatarIcon } from '../../Icons';
import { Row } from '../../Row';
import { Col } from '../../Col';
import { CircleButton } from '../../Buttons/CircleButton';

const { Header: LayoutHeader } = Layout;

const LayoutHeaderStyled = styled(LayoutHeader)`
  position: fixed;
  top: 0;
  height: 80px;
  z-index: 100;
  width: 100%;
  color: white;
  background-color: #1c3463e0;
`;

const RowStyled = styled(Row)`
  height: 100%;
  padding: 1rem;
`;

export default function Header() {
  return (
    <LayoutHeaderStyled
      data-testid="layout-header"
    >
      <RowStyled align="middle">
        <Col flex={1}>Happy pig</Col>
        <Col>
          <CircleButton size="large" icon={<AvatarIcon />} />
        </Col>
      </RowStyled>
    </LayoutHeaderStyled>
  );
}
