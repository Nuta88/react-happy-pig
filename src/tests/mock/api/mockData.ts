export const testMockData = {
  bank: {
    amount: 101000,
    loanAmount: 500000,
    loanRepaymentAmount: 20000,
    loanBalance: 480000,
    incomesTotalAmount: 150000,
    transfersTotalAmount: 5000
  },
  loans: [ {
    id: 1,
    name: 'Car Loan',
    amount: 300000,
    balance: 250000,
    repaymentAmount: 15000,
    paymentAmount: 20000,
    description: 'Loan for a new car',
    loanPayments: [
      {
        id: 1,
        loanId: 1,
        amount: 20000,
        date: '2022-01-15'
      }
    ]
  } ],
  funds: [
    {
      id: 1,
      name: 'Test_Car_Name',
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
  ]
};
