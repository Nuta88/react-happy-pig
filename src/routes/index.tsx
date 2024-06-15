import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthPageLayout, PageLayout, ErrorBoundary } from '../components';

const Funds = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Funds'));
const FundDetail = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/FundDetail'));
const Bank = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Bank'));
const Login = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Login'));
const Register = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Register'));
const Statistics = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Statistics'));
const Tag = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Tag'));
const Expenses = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Expenses'));

const routers = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Statistics />
      },
      {
        path: 'funds',
        element: <Funds />
      },
      {
        path: 'funds/:id',
        element: <FundDetail />
      },
      {
        path: 'funds/expenses',
        element: <Expenses />
      },
      {
        path: 'bank',
        element: <Bank />
      },
      {
        path: 'tags',
        element: <Tag />
      }
    ]
  },
  {
    element: <AuthPageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
]);

const AppRouters = (): JSX.Element => (
  <RouterProvider router={routers} />
);

export default AppRouters;
