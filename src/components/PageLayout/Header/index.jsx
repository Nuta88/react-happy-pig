import { Layout } from 'antd';
import { AvatarIcon } from '../../Icons';
import { Row } from '../../Row';
import { Col } from '../../Col';
import { CircleButton } from '../../Buttons/CircleButton';

const { Header: LayoutHeader } = Layout;

const headerStyle = {
  position: "fixed",
  top: 0,
  height: 80,
  zIndex: 100,
  width: "100%",
  color: "white",
  backgroundColor: "#1c3463e0",
};

const rowStyle = {
  height: "100%",
  padding: '1rem'
};

export default function Header() {
  return (
    <LayoutHeader
      data-testid="layout-header"
      style={headerStyle}
    >
      <Row
        align="middle"
        style={rowStyle}
      >
        <Col flex={1}>Happy pig</Col>
        <Col>
          <CircleButton size="large" icon={<AvatarIcon />} />
        </Col>
      </Row>
    </LayoutHeader>
  );
}
