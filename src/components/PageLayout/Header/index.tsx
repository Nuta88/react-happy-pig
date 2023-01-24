import { navigationLinks } from '../../../constants/common';
import {
  Col,
  CircleButton,
  AvatarIcon
} from '../../index';

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

export default Header;
