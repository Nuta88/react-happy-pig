import Icon from '@ant-design/icons';
import React from 'react';

import logo from '../../../assets/logo.png';
import { apiUrls } from '../../../constants/apiUrls';
import { navigationLinks } from '../../../constants/common';
import { useAuth } from '../../../hooks';
import {
  Col,
  CircleButton,
  AvatarIcon,
  Dropdown,
  TextButton,
  LogoutIcon
} from '../../index';
import { InlineCenter } from '../../Space/InlineCenter';

import {
  ColStyled,
  LinkStyled,
  LayoutHeaderStyled,
  RowStyled,
  LogoStyled
} from './styled';

const Header = (): JSX.Element => {
  const { onLogout } = useAuth();

  const menuList = [
    {
      label: <TextButton icon={<LogoutIcon />} onClick={onLogout}>Logout</TextButton>,
      key: 'logout'
    }
  ];

  return (
    <LayoutHeaderStyled data-testid="layout-header">
      <RowStyled align="middle" gutter={[ 16, 16 ]}>
        <Col>
          <LinkStyled to={apiUrls.root}>
            <LogoStyled src={logo} />
          </LinkStyled>
        </Col>
        <ColStyled flex={1}>
          {navigationLinks.map(navigation => (
            <LinkStyled
              key={navigation.name}
              to={navigation.link}
            >
              <InlineCenter>
                <Icon component={navigation.icon as React.ForwardRefExoticComponent<any>} />
                {navigation.name}
              </InlineCenter>
            </LinkStyled>
          ))}
        </ColStyled>
        <Col>
          <Dropdown items={menuList}>
            <CircleButton size="large" icon={<AvatarIcon />} />
          </Dropdown>
        </Col>
      </RowStyled>
    </LayoutHeaderStyled>
  );
};

export default Header;
