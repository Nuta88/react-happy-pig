export const apiUrls = {
  root: '/',
  home: '/home',
  funds: {
    root: '/funds',
    rootWithId: (id: number) => `/funds/${id}`,
    close: (id: number) => `/funds/close/${id}`,
    transfer: (id: number) => `/funds/${id}/amount`,
    expenses: '/funds/expenses',
    moveExpense: (newFundId: number, expenseId: number) => `/funds/expenses/${expenseId}/move/${newFundId}`
  },
  bank: {
    root: '/bank',
    incomes: '/bank/incomes',
    incomeWithId: (id: number) => `/bank/incomes/${id}`,
    loans: '/bank/loans',
    activeLoans: '/bank/loans/active',
    activeLoansWithId: (id: number) => `/bank/loans/active/${id}`,
    loanWithId: (id: number) => `/bank/loans/${id}`,
    closeLoan: (id: number) => `/bank/loans/${id}/close`
  },
  tags: {
    root: '/tags',
    rootWithId: (id: string) => `/tags/${id}`,
    associations: '/tags/associations'
  },
  statistics: {
    root: '/statistics'
  },
  billTracker: {
    root: '/bill-tracker',
    rootWithId: (id: number) => `/bill-tracker/${id}`
  }
};

export const authorizedPaths = [ '/login', '/register' ];
