import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthPageLayout, PageLayout, ErrorBoundary } from '../components';

const Funds = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Funds'));
const FundDetail = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/FundDetail'));
const Bank = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Bank'));
const Login = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Login'));
const Register = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Register'));
const Home = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Home'));

const routers = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />
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
        path: 'bank',
        element: <Bank />
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
