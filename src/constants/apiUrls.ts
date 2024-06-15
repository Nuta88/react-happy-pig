export const apiUrls = {
  root: '/',
  home: '/home',
  funds: {
    root: '/funds',
    rootWithId: (id: number) => `/funds/${id}`,
    close: (id: number) => `/funds/close/${id}`,
    transfer: (id: number) => `/funds/${id}/amount`,
    expenses: '/funds/expenses'
  },
  bank: {
    root: '/bank',
    incomes: '/bank/incomes',
    incomeWithId: (id: number) => `/bank/incomes/${id}`
  },
  tags: {
    root: '/tags',
    rootWithId: (id: string) => `/tags/${id}`,
    associations: '/tags/associations'
  },
  statistics: {
    root: '/statistics'
  }
};

export const authorizedPaths = [ '/login', '/register' ];
