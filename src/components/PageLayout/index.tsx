import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Loading } from '../index';

import Header from './Header';

const { Content } = Layout;

const ContentStyled = styled(Content)`
  height: calc(100vh - 7rem);
  overflow: hidden;
  margin-top: 3.75rem;
  padding: 1rem 2rem;
`;

const PageLayout = (): JSX.Element => (
    <>
      <Header />
      <ContentStyled data-testid="layout-content">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ContentStyled>
    </>
);

export default PageLayout;
