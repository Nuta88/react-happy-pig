import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageLayout, ErrorBoundary } from '../components';

const Funds = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Funds'));
const FundDetail = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/FundDetail'));
const Bank = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Bank'));

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
      },
      {
        path: 'bank',
        element: <Bank />
      }
    ]
  }
]);

const AppRouters = (): JSX.Element => (
  <RouterProvider router={routers} />
);

export default AppRouters;
