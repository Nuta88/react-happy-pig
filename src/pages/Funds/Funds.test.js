import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import Funds from './index';

describe('Funds tests', () => {
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

      await waitFor(() => expect(screen.queryByText('Create new fund')).toBeInTheDocument());
      fireEvent.click(screen.queryByText('Cancel'));
    });
  });
  test('should create new fund', async () => {
    await renderWithProviders(<Funds />);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('create-fund-btn'));
      await waitFor(() => expect(screen.queryByText('Create new fund')).toBeInTheDocument());

      expect(screen.getByTestId('fund-input-name')).toBeInTheDocument();
      fireEvent.change(screen.getByTestId('fund-input-name'), {target: {value: 'New test fund'}});
      expect(screen.getByTestId('fund-input-name').value).toBe('New test fund');

      expect(screen.getByTestId('fund-input-paymentAmount')).toBeInTheDocument();
      fireEvent.change(screen.getByTestId('fund-input-paymentAmount'), {target: {value: 1000}});
      expect(screen.getByTestId('fund-input-paymentAmount').value).toBe('1000');

      fireEvent.click(screen.getByText("Create"));
    });
  });
  test('should remove fund', async () => {
    await renderWithProviders(<Funds />);

    expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId('fund-Car')).toBeInTheDocument();
      expect(screen.getByTestId('fund-Car-remove-fund')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('fund-Car-remove-fund'));

      await waitFor(() => fireEvent.click(screen.queryByText('Yes')));
    });
  });
});
