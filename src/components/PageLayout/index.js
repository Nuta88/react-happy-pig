import {
  Outlet
} from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';

const { Content } = Layout;

const contentStyle = {
  marginTop: 60,
  padding: "1rem 2rem",
  height: "calc(100vh - 110px)",
  overflow: 'hidden'
};

export default function PageLayout() {
  return (
    <>
      <Header />
      <Content style={contentStyle} data-testid="layout-content">
        <Outlet />
      </Content>
    </>
  );
}
