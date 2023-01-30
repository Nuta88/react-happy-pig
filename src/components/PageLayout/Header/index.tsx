import Icon from '@ant-design/icons';
import React from 'react';

import { navigationLinks } from '../../../constants/common';
import {
  Col,
  CircleButton,
  AvatarIcon
} from '../../index';
import { InlineCenter } from '../../Space/InlineCenter';

import { LinkStyled, LayoutHeaderStyled, RowStyled } from './styled';

const Header = (): JSX.Element => (
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
              <InlineCenter>
                <Icon component={navigation.icon as React.ForwardRefExoticComponent<any>} />
                {navigation.name}
              </InlineCenter>
            </LinkStyled>
          ))}
        </Col>
        <Col>
          <CircleButton size="large" icon={<AvatarIcon />} />
        </Col>
      </RowStyled>
    </LayoutHeaderStyled>
);

export default Header;
