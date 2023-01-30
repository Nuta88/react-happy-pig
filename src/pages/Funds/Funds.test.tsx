import { screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../mock/api/server';
import { renderWithProviders } from '../../test-utils';

import Funds from './index';

describe('Funds tests', () => {
  server.use(
    rest.get('*', (_req, res, ctx) =>
      res.once(ctx.status(200), ctx.json([ {
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
      } ]))
    )
  );
  test('should render fund items', async () => {
    await renderWithProviders(<Funds />);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId('fund-Car')).toBeInTheDocument();
    });
  });
  test('should open and close modal', async () => {
    await renderWithProviders(<Funds />);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId('create-fund-btn')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('create-fund-btn'));

      await waitFor(() => { expect(screen.queryByText('Create new fund')).toBeInTheDocument(); });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireEvent.click(screen.queryByText('Cancel'));
    });
  });
  test('should create new fund', async () => {
    await renderWithProviders(<Funds />);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('create-fund-btn'));
      await waitFor(() => { expect(screen.queryByText('Create new fund')).toBeInTheDocument(); });

      expect(screen.getByTestId('fund-input-name')).toBeInTheDocument();
      fireEvent.change(screen.getByTestId('fund-input-name'), { target: { value: 'New test fund' } });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(screen.getByTestId('fund-input-name').value).toBe('New test fund');

      expect(screen.getByTestId('fund-input-paymentAmount')).toBeInTheDocument();
      fireEvent.change(screen.getByTestId('fund-input-paymentAmount'), { target: { value: 1000 } });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(screen.getByTestId('fund-input-paymentAmount').value).toBe('1000');

      fireEvent.click(screen.getByText('Create'));
    });
  });
  test('should remove fund', async () => {
    await renderWithProviders(<Funds />);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId('fund-Car')).toBeInTheDocument();
      expect(screen.getByTestId('fund-Car-remove-fund')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('fund-Car-remove-fund'));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await waitFor(() => fireEvent.click(screen.queryByText('Yes')));
    });
  });
});
