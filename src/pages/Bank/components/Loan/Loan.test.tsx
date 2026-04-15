import {
  screen,
  waitFor
} from '@testing-library/react';
import { it } from 'vitest';

import { testMockData } from '../../../../tests/mock/api/mockData';
import { renderWithProviders } from '../../../../tests/test-utils';
import { getAmount } from '../../../../utils/fund';

import Loan from './index';

describe('Loan tests', () => {
  const loan = testMockData.loans[0];
  it('should render loans card', async () => {
    await renderWithProviders(<Loan />);

    expect(screen.getByTestId('bank-loans')).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId(`loan-card-${loan.id}`)).toBeInTheDocument();
      expect(screen.getByText(`${loan.name ?? 'Loan'} ${getAmount(loan.amount)}`)).toBeInTheDocument();
    });
  });
});
