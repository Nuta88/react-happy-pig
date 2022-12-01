import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Funds = lazy(() => import('../pages/Funds'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div>Loading...</div>}><Funds /></Suspense>,
  },
]);

const AppRouters = () => (
  <RouterProvider router={router} />
);

export default AppRouters;
