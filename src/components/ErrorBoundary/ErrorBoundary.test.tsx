import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import ErrorBoundary from './index';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useRouteError: () => ({})
  };
});

describe('Error Boundary tests', () => {
  test('should render default Error Boundary', async () => {
    render(<ErrorBoundary />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('error-content')).toBeInTheDocument();
    expect(screen.getByTestId('error-title')).toHaveTextContent('Something went wrong');
  });
});
