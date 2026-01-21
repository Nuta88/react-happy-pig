import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it } from 'vitest';

import { renderWithProviders } from '../../tests/test-utils';

import FundDetail from './index';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      id: 1
    })
  };
});

describe('FundDetail tests', () => {
  it('should render fund detail page', async () => {
    const container = await renderWithProviders(<FundDetail />);

    expect(container.getByTestId('fund-page-content')).toBeInTheDocument();

    await waitFor(async () => {
      expect(container.getByTestId('fund-page-name')).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return content.includes('Test_Car_Name') && content.includes('$6,493');
      })).toBeInTheDocument();
      expect(container.getByTestId('fund-expenses-table')).toBeInTheDocument();
      // Actions
      expect(container.getByTestId('fund-open-tag')).toBeInTheDocument();
      expect(container.getByTestId('fund-open-transaction-modal')).toBeInTheDocument();
      expect(container.getByTestId('fund-open-info-modal')).toBeInTheDocument();
      expect(container.getByTestId('fund-open-create-modal')).toBeInTheDocument();
      // table
      expect(container.getByTestId('fund-expenses-table')).toBeInTheDocument();
    });
  });
  it('should render and open create expense modal', async () => {
    await renderWithProviders(<FundDetail />);

    expect(screen.getByTestId('fund-page-content')).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId('fund-open-create-modal')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('fund-open-create-modal'));

      await waitFor(() => {
        expect(screen.queryByText('Add expense')).toBeInTheDocument();
        expect(screen.getByLabelText('Recipient')).toBeInTheDocument();
        expect(screen.getByLabelText('Amount')).toBeInTheDocument();
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
      });
      const modalClose = document.querySelector('.ant-modal-close');
      if (modalClose) {
        userEvent.click(modalClose);
      }
    });
  });
  it('should render and open edit expense modal', async () => {
    await renderWithProviders(<FundDetail />);

    expect(screen.getByTestId('fund-page-content')).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId('fund-open-create-modal')).toBeInTheDocument();
      expect(screen.getAllByTestId('edit-expense-btn')[0]).toBeInTheDocument();
      userEvent.click(screen.getAllByTestId('edit-expense-btn')[0]);

      await waitFor(() => {
        expect(screen.queryByText('Edit expense')).toBeInTheDocument();
        expect(screen.getByLabelText('Recipient')).toBeInTheDocument();
        expect(screen.getByLabelText('Amount')).toBeInTheDocument();
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
      });
      const modalClose = document.querySelector('.ant-modal-close');
      if (modalClose) {
        userEvent.click(modalClose);
      }
    });
  });
  it('should navigate to funds page', async () => {
    const container = await renderWithProviders(<FundDetail />);

    expect(screen.getByTestId('fund-page-content')).toBeInTheDocument();

    await waitFor(async () => {
      expect(container.getByTestId('page-back-icon')).toBeInTheDocument();
      userEvent.click(container.getByTestId('page-back-icon'));
    });
  });
});
