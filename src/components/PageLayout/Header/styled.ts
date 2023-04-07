import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Col } from '../../Col';
import { Row } from '../../Row';

const { Header: LayoutHeader } = Layout;

export const LayoutHeaderStyled = styled(LayoutHeader)`
  position: fixed;
  top: 0;
  height: 5rem;
  z-index: 100;
  width: 100%;
  text-transform: uppercase;
  color: white;
  background-color: #1c3463e0;
`;

export const RowStyled = styled(Row)`
  height: 100%;
  padding: 1rem 2rem;
`;

export const ColStyled = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const LinkStyled = styled(NavLink)`
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

export const LogoStyled = styled.img`
  height: 2.3rem;
`;
