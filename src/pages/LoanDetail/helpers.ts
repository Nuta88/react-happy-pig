import {
  ILoan,
  LoanPayment
} from '../../types/bank';

export const getLoanWithNewPayments = (loan: ILoan, payment: LoanPayment): ILoan => {
  if (payment.id != null) {
    return {
      ...loan,
      loanPayments: loan?.loanPayments?.map((p) => (p.id === payment.id ? payment : p)) ?? []
    };
  }

  return { ...loan, loanPayments: [ ...(loan?.loanPayments ?? []), payment ] };
};

export const removePaymentFromLoan = (loan: ILoan, paymentId: number): ILoan => {
  return {
    ...loan,
    loanPayments: loan?.loanPayments?.filter((payment) => payment.id !== paymentId) ?? []
  };
};
