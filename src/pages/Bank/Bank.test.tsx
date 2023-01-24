import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../mock/api/server';
import { renderWithProviders } from '../../test-utils';

import Bank from './index';

describe('Bank tests', () => {
  server.use(
    rest.get('*', (_req, res, ctx) =>
      res.once(ctx.status(200), ctx.json({
        amount: 101000,
        incomes: [
          {
            id: 1,
            amount: 100500,
            source: 'GIFT',
            data: '2023-10-11'
          }
        ]
      }))
    )
  );
  test('should render Bank page with incomes table', async () => {
    await renderWithProviders(<Bank />);

    expect(screen.getByTestId('bank-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByText('Bank ($1,010)')).toBeInTheDocument();
      expect(screen.getByTestId('bank-page-table-title')).toHaveTextContent('Incomes');
    });
  });
});
