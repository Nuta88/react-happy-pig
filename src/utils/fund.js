export const convertToCurrency = amount => (amount / 100);

export const convertToPennies = amount => (amount * 100);

export const getPercentage = ({ currentAmount = 0, plannedAmount = 0 }) => {
  if ( currentAmount === plannedAmount ) return 100;

  return Math.floor(100 - ((currentAmount / plannedAmount) * 100));
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export const toUSD = number => formatter.format(number);

export const getFundAmount = (amount = 0) => toUSD(convertToCurrency(amount));