export const convertToCurrency = amount => (amount / 100);

export const convertToPennies = amount => (amount * 100);

export const getPercentage = ({ currentAmount = 1, plannedAmount = 1 }) => {
  return Math.floor(100 - ((currentAmount / plannedAmount) * 100));
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export const toUSD = number => formatter.format(number);

export const getFundAmount = (amount = 0) => toUSD(convertToCurrency(amount));

export const upsertExpense = (expenses, expense) => {
  const fundExpenses = [...expenses];

  const elementIndex = fundExpenses.findIndex(e => e.id === expense.id);

  if (elementIndex !== -1) {
    fundExpenses[elementIndex] = { ...expense };
  } else {
    fundExpenses.push(expense);
  }

  return fundExpenses;
}