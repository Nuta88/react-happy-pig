import Icon from '@ant-design/icons';
import {
  ForwardRefExoticComponent,
  memo
} from 'react';

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
  RowStyled
} from './styled';

const Header = (): JSX.Element => {
  const { onLogout } = useAuth();

  return (
    <LayoutHeaderStyled data-testid="layout-header">
      <RowStyled align="middle" gutter={[ 16, 16 ]}>
        <Col>
          <LinkStyled to={apiUrls.root}>
            <img src={logo} width="50" height="38" alt="HP" />
          </LinkStyled>
        </Col>
        <ColStyled flex={1}>
          {navigationLinks.map(navigation => (
            <LinkStyled
              key={navigation.name}
              to={navigation.link}
            >
              <InlineCenter>
                <Icon component={navigation.icon as ForwardRefExoticComponent<any>} />
                {navigation.name}
              </InlineCenter>
            </LinkStyled>
          ))}
        </ColStyled>
        <Col>
          <Dropdown items={
            [
              {
                label: <TextButton icon={<LogoutIcon />} onClick={onLogout}>Logout</TextButton>,
                key: 'logout'
              }
            ]
          }>
            <CircleButton size="large" icon={<AvatarIcon />} />
          </Dropdown>
        </Col>
      </RowStyled>
    </LayoutHeaderStyled>
  );
};

export default memo(Header);
