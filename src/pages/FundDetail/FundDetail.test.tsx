import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from '../../mock/api/server';
import { renderWithProviders } from '../../test-utils';

import FundDetail from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 1 })
}));

describe('FundDetail tests', () => {
  server.use(
    rest.get('*', (_req, res, ctx) =>
      res.once(ctx.status(200), ctx.json({
        id: 1,
        name: 'Car',
        plannedAmount: 1000000,
        currentAmount: 649300,
        expenses: [
          {
            id: 1,
            paymentAmount: 200600,
            recipient: 'Mix Mart',
            description: 'Something else',
            date: '2022-05-28'
          },
          {
            id: 2,
            paymentAmount: 150100,
            recipient: 'FOX',
            description: 'Something',
            date: '2022-12-03'
          }
        ]
      }))
    )
  );
  test('should render fund and modal', async () => {
    await renderWithProviders(<FundDetail />);

    expect(screen.getByTestId('fund-page-content')).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByText('Car')).toBeInTheDocument();
      expect(screen.getByTestId('fund-open-create-modal')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('fund-open-create-modal'));

      await waitFor(() => { expect(screen.queryByText('Add expense')).toBeInTheDocument(); });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireEvent.click(screen.queryByText('Cancel'));
    });
  });
  test('should open edit modal', async () => {
    const result = await renderWithProviders(<FundDetail />);

    await waitFor(async () => {
      expect(screen.getByText('Car')).toBeInTheDocument();
      expect(screen.getAllByTestId('edit-expense-btn')[0]).toBeInTheDocument();
      userEvent.click(screen.getAllByTestId('edit-expense-btn')[0]);

      await waitFor(() => {
        expect(screen.queryByText('Edit expense')).toBeInTheDocument();
        userEvent.type(result.container.querySelector('#expense-modal_recipient'), 'new recipient');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        userEvent.click(screen.queryByText('Edit'));
      });
    });
  });
  test('should navigate to funds page', async () => {
    await renderWithProviders(<FundDetail />);

    await waitFor(async () => {
      expect(screen.getByText('Car')).toBeInTheDocument();
      expect(screen.getByTestId('page-back-icon')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('page-back-icon'));
    });
  });
  test('should editing fund title', async () => {
    await renderWithProviders(<FundDetail />);

    await waitFor(async () => {
      expect(screen.getByText('Car')).toBeInTheDocument();
      expect(screen.getByTestId('fund-page-title')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('fund-page-title'));
      expect(screen.getByTestId('fund-page-title-input')).toBeInTheDocument();
      expect(screen.getByTestId('fund-page-title-input-close')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('fund-page-title-input-close'));
    });
  });
});
