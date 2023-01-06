import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { navigationLinks } from '../../../constants/common';

import {
  Col,
  Row,
  CircleButton,
  AvatarIcon
} from '../../index';

const { Header: LayoutHeader } = Layout;

const LayoutHeaderStyled = styled(LayoutHeader)`
  position: fixed;
  top: 0;
  height: 5rem;
  z-index: 100;
  width: 100%;
  text-transform: uppercase;
  color: white;
  background-color: #1c3463e0;
`;

const RowStyled = styled(Row)`
  height: 100%;
  padding: 1rem;
`;

const LinkStyled = styled(NavLink)`
  padding: 0 .25rem;
  color: #d1d4d7;

  &.active {
    color: #f8f9fa;
    text-decoration: underline;
  }

  &:hover {
    color: #92bfdc;
  }
`;

export default function Header() {
  return (
    <LayoutHeaderStyled
      data-testid="layout-header"
    >
      <RowStyled align="middle">
        <Col flex={1}>Happy pig</Col>
        <Col flex={1}>
          {navigationLinks.map(navigation => (
            <LinkStyled
              key={navigation.name}
              to={navigation.link}
            >
              {navigation.name}
            </LinkStyled>
          ))}
        </Col>
        <Col>
          <CircleButton size="large" icon={<AvatarIcon />} />
        </Col>
      </RowStyled>
    </LayoutHeaderStyled>
  );
}
