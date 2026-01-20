import { waitFor } from '@testing-library/react';
import { it } from 'vitest';

import { renderWithProviders } from '../../test-utils';
import { testMockData } from '../../tests/mock/api/mockData';

import Funds from './index';

describe('Funds tests', () => {
  it('should render fund card', async () => {
    const container = await renderWithProviders(<Funds />);

    expect(container.getByTestId('funds-page-content')).toBeInTheDocument();
    await waitFor(async () => {
      testMockData.funds.forEach(fund => {
        expect(container.getByTestId(`fund-${fund.name}`)).toBeInTheDocument();
      });
    });
  });
  // it('should create new fund', async () => {
  //   await renderWithProviders(<Funds />);
  //
  //   expect(screen.getByTestId('funds-page-content')).toBeInTheDocument();
  //   expect(screen.getByTestId('create-fund-btn')).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId('create-fund-btn'));
  //
  //   await waitFor(async () => {
  //     expect(screen.queryByText('Create new fund')).toBeInTheDocument();
  //
  //     expect(screen.getByTestId('fund-input-name')).toBeInTheDocument();
  //     fireEvent.change(screen.getByTestId('fund-input-name'), { target: { value: 'New test fund' } });
  //     // @ts-expect-error
  //     expect(screen.getByTestId('fund-input-name').value).toBe('New test fund');
  //
  //     expect(screen.getByTestId('fund-input-requestedAmount')).toBeInTheDocument();
  //     fireEvent.change(screen.getByTestId('fund-input-requestedAmount'), { target: { value: 1000 } });
  //     // @ts-expect-error
  //     expect(screen.getByTestId('fund-input-requestedAmount').value).toBe('1000');
  //     fireEvent.click(screen.getByText('Create'));
  //     expect(screen.getByTestId('New test fund')).toBeInTheDocument();
  //   });
  // });
});
