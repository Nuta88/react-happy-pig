import { Card, Layout } from 'antd';

import PageHeader from './PageHeader';
import ErrorBoundary from '../ErrorBoundary';

const { Content } = Layout;

const contentStyle = {
  marginTop: 80,
  padding: 10,
  height: "calc(100vh - 110px)",
  overflow: "auto",
};

const cardStyle = {
  height: "100%",
};

export default function PageLayout({ children }) {
  return (
    <>
      <PageHeader />
      <ErrorBoundary>
        <Content style={contentStyle}>
          <Card style={cardStyle}>
            {children}
          </Card>
        </Content>
      </ErrorBoundary>
    </>
  );
}
