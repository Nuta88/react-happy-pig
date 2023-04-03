import {
  fireEvent,
  screen,
  waitFor
} from '@testing-library/react';
import { rest } from 'msw';

import { IncomeSource } from '../../constants/bank';
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
            source: IncomeSource.GIFT,
            data: '2023-10-11'
          },
          {
            id: 2,
            amount: 100500,
            source: IncomeSource.COMPENSATION,
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
      expect(screen.getByText('Incomes')).toBeInTheDocument();
    });
  });
  test('should remove income', async () => {
    await renderWithProviders(<Bank />);
    await waitFor(async () => {
      expect(screen.getAllByTestId('delete-income-btn')[0]).toBeInTheDocument();
      fireEvent.click(screen.getAllByTestId('delete-income-btn')[0]);
    });
  });
  test('should open and close create income modal', async () => {
    await renderWithProviders(<Bank />);

    expect(screen.getByTestId('bank-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId('create-income-btn')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('create-income-btn'));

      await waitFor(() => { expect(screen.queryByText('Add new income')).toBeInTheDocument(); });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireEvent.click(screen.queryByText('Cancel'));
    });
  });
  test('should open and close edit income modal', async () => {
    await renderWithProviders(<Bank />);

    expect(screen.getByTestId('bank-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getAllByTestId('edit-income-btn')[0]).toBeInTheDocument();
      fireEvent.click(screen.getAllByTestId('edit-income-btn')[0]);

      await waitFor(() => { expect(screen.queryByText('Edit income')).toBeInTheDocument(); });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireEvent.click(screen.queryByText('Cancel'));
    });
  });
});
