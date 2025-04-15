import type { Currency } from './types';

export const formatAmount = (
  amount: number | string | undefined,
  currency: Currency
) => {
  if (amount === undefined || amount === null || amount === '') {
    return '0.00';
  }

  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};
