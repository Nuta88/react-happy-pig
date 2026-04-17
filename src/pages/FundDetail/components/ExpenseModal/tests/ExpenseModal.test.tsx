import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it } from 'vitest';

import { renderWithProviders } from '../../../../../tests/test-utils';
import ExpenseModal from '../index';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      id: 1
    })
  };
});

vi.mock('../../../../services/funds', () => ({
  useCreateExpenseMutation: () => [ vi.fn() ],
  useUpdateExpenseMutation: () => [ vi.fn() ]
}));

vi.mock('./helpers', () => ({
  convertFormValuesToExpense: vi.fn(() => ({ mock: 'expense' })),
  createInitFormValues: vi.fn(() => ({
    recipient: '',
    paymentAmount: null,
    date: null,
    description: ''
  }))
}));

describe('ExpenseModal tests', () => {
  const expense = {
    id: 1,
    fundId: 1,
    paymentAmount: 150100,
    recipient: 'Test recipient',
    description: 'Test',
    date: '2022-12-03'
  };
  const onClose = vi.fn();
  it('should render create modal', async () => {
    await renderWithProviders(
      <ExpenseModal
        isOpen
        fundId={1}
        key={1}
        onClose={onClose}
        expense={null}
        availableAmount={0}
      />);
    userEvent.type(screen.getByLabelText(/Recipient/i), 'John');
    userEvent.type(screen.getByLabelText(/Amount/i), '100');
    userEvent.click(screen.getByText('Add'));
  });
  it('should render edit modal', async () => {
    const container = await renderWithProviders(
      <ExpenseModal
        isOpen
        fundId={1}
        key={1}
        onClose={onClose}
        expense={expense}
        availableAmount={0}
      />);

    expect(container.getByTestId('expense-modal-content')).toBeInTheDocument();
    expect(screen.queryByText('Edit expense')).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/Amount/i), '1100');
    userEvent.click(screen.getByText('Edit'));
    expect(await screen.findByText(/amount/i)).toBeInTheDocument();
  });
});
