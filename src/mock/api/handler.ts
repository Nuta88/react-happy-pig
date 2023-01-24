import { rest } from 'msw';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/funds', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      {
        id: 1,
        name: 'Car',
        plannedAmount: 1000000,
        currentAmount: 649300,
        expenses: [
          {
            id: 1,
            paymentAmount: 200600,
            recipient: 'Mix Mart',
            description: 'Something else',
            date: '2022-05-28'
          },
          {
            id: 2,
            paymentAmount: 150100,
            recipient: 'FOX',
            description: 'Something',
            date: '2022-12-03'
          }
        ]
      },
      {
        id: 2,
        name: 'Phone',
        plannedAmount: 20000,
        currentAmount: 20000,
        expenses: []
      }
    ]), ctx.delay(30));
  })
];
