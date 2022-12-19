import { rest } from 'msw';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { server } from '../../mock/api/server';

import Fund from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 1 })
}));

describe('FundDetail tests', () => {
  server.use(
    rest.get('*', (_req, res, ctx) =>
      res.once(ctx.status(200), ctx.json({
        id: 1,
        name: "Car",
        plannedAmount: 1000000,
        currentAmount: 649300,
        expenses: [
          {
            id: 1,
            paymentAmount: 200600,
            recipient: "Mix Mart",
            description: "Something else",
            date: "2022-05-28"
          },
          {
            id: 2,
            paymentAmount: 150100,
            recipient: "FOX",
            description: "Something",
            date: "2022-12-03"}
        ]
      }))
    )
  );
  test('should render fund and modal', async () => {
    await renderWithProviders(<Fund />);

    expect(screen.getByTestId('fund-page-content')).toBeInTheDocument();
    expect(screen.getByText('Fund')).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByText('Car Fund')).toBeInTheDocument();
      expect(screen.getByTestId('fund-open-create-modal')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('fund-open-create-modal'));

      await waitFor(() => expect(screen.queryByText('Add expense')).toBeInTheDocument());
      // @ts-ignore
      fireEvent.click(screen.queryByText('Cancel'));
    });
  });
});
