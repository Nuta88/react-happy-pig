import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loading, ErrorBoundary } from '../components'

const Funds = lazy(() => import('../pages/Funds'));
const Fund = lazy(() => import('../pages/Fund'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Funds />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />
  },
  {
    path: "funds/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <Fund />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />
  }
]);

const AppRouters = () => (
  <RouterProvider router={router} />
);

export default AppRouters;
