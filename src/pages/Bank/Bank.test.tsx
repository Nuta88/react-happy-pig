import {
  screen,
  waitFor
} from '@testing-library/react';
import { it } from 'vitest';

import { renderWithProviders } from '../../tests/test-utils';

import Bank from './index';

describe('Bank tests', () => {
  it('should render Bank page with incomes table', async () => {
    await renderWithProviders(<Bank />);

    expect(screen.getByTestId('bank-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByText('Bank ($1,010)')).toBeInTheDocument();
      expect(screen.getByText('Incomes')).toBeInTheDocument();
    });
  });
  // test('should remove income', async () => {
  //   await renderWithProviders(<Bank />);
  //   await waitFor(async () => {
  //     expect(screen.getAllByTestId('delete-income-btn')[0]).toBeInTheDocument();
  //     fireEvent.click(screen.getAllByTestId('delete-income-btn')[0]);
  //   });
  // });
  // test('should open and close create income modal', async () => {
  //   await renderWithProviders(<Bank />);
  //
  //   expect(screen.getByTestId('bank-page-content')).toBeInTheDocument();
  //   await waitFor(async () => {
  //     expect(screen.getByTestId('create-income-btn')).toBeInTheDocument();
  //     fireEvent.click(screen.getByTestId('create-income-btn'));
  //
  //     await waitFor(() => { expect(screen.queryByText('Add new income')).toBeInTheDocument(); });
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     fireEvent.click(screen.queryByText('Cancel'));
  //   });
  // });
  // test('should open and close edit income modal', async () => {
  //   await renderWithProviders(<Bank />);
  //
  //   expect(screen.getByTestId('bank-page-content')).toBeInTheDocument();
  //   await waitFor(async () => {
  //     expect(screen.getAllByTestId('edit-income-btn')[0]).toBeInTheDocument();
  //     fireEvent.click(screen.getAllByTestId('edit-income-btn')[0]);
  //
  //     await waitFor(() => { expect(screen.queryByText('Edit income')).toBeInTheDocument(); });
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     fireEvent.click(screen.queryByText('Cancel'));
  //   });
  // });
});
