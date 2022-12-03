import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Header from './Header';

const { Content } = Layout;

const contentStyle = {
  marginTop: 60,
  padding: "1rem 2rem",
  height: "calc(100vh - 110px)",
  overflow: 'hidden'
};

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <Content style={contentStyle}>
        {children}
      </Content>
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
};
