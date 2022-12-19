import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageLayout, ErrorBoundary } from '../components';

const Funds = lazy(() => import('../pages/Funds'));
const FundDetail = lazy(() => import('../pages/FundDetail'));

const routers = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Funds />
      },
      {
        path: 'funds/:id',
        element: <FundDetail />
      }
    ]
  }
]);

const AppRouters = () => (
  <RouterProvider router={routers} />
);

export default AppRouters;
