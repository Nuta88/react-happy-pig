export const apiUrls = {
  root: '/',
  funds: {
    root: '/funds',
    create: '/funds/create',
    details: (id: number) => `/funds/${id}`,
    delete: (id: number) => `/funds/delete/${id}`,
    update: (id: number) => `/funds/update/${id}`
  },
  bank: {
    root: '/bank'
  }
};
