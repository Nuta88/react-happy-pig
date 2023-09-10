export const apiUrls = {
  root: '/',
  home: '/home',
  funds: {
    root: '/funds',
    rootWithId: (id: number) => `/funds/${id}`
  },
  bank: {
    root: '/bank',
    incomes: '/bank/incomes',
    incomeWithId: (id: number) => `/bank/incomes/${id}`
  }
};

export const authorizedPaths = [ '/login', '/register' ];
