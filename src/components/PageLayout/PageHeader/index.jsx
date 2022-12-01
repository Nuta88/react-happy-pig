import { Button, Col, Row, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Header } = Layout;

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

export default function PageHeader() {
  return (
    <Header
      style={headerStyle}
    >
      <Row
        align="middle"
        style={rowStyle}
      >
        <Col flex={1}>Happy pig</Col>
        <Col>
          <Button size="large" shape="circle" icon={<PlusOutlined />} />
        </Col>
      </Row>
    </Header>
  );
}
