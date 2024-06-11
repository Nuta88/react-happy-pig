export const apiUrls = {
  root: '/',
  home: '/home',
  funds: {
    root: '/funds',
    rootWithId: (id: number) => `/funds/${id}`,
    close: (id: number) => `/funds/close/${id}`,
    transfer: (id: number) => `/funds/${id}/amount`
  },
  bank: {
    root: '/bank',
    incomes: '/bank/incomes',
    incomeWithId: (id: number) => `/bank/incomes/${id}`
  },
  tags: {
    root: '/tags',
    rootWithId: (id: string) => `/tags/${id}`
  }
};

export const authorizedPaths = [ '/login', '/register' ];
