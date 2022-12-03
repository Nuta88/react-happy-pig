import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { renderWithProviders } from './test-utils';
import { server } from './mock/api/server';
import App from './App';

describe('App tests', () => {
  server.use(
    rest.get('*', (_req, res, ctx) =>
      res.once(ctx.status(500), ctx.json({message: 'there was an error'}))
    )
  );

  test('should render header and content', async () => {
    await renderWithProviders(<App />, true);

    expect(screen.getByTestId('layout-header')).toBeInTheDocument();
    expect(screen.getByTestId('layout-content')).toBeInTheDocument();
  });

  test('should render empty funds', async () => {
    await renderWithProviders(<App />, true);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('empty-funds')).toBeInTheDocument());
  });
});
