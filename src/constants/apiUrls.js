export const apiUrls = {
  funds: {
    root: '/funds',
    create: '/funds/create',
    details: id => `/funds/${id}`,
    delete: id => `/funds/delete/${id}`,
    update: id => `/funds/update/${id}`
  }
};
