import type { Currency } from '../types';

const MIN_AMOUNTS = {
  GBP: 500, // 5 pounds in smallest unit (pence)
  EUR: 1000, // 10 euros in smallest unit (cents)
} as const;

const VALID_COUNTRY_CURRENCY: Record<Currency, string[]> = {
  GBP: ['GB'],
  EUR: ['DE', 'FR', 'BE', 'IE', 'ES', 'NL', 'AT', 'IT', 'PT'],
};

type ValidCountry =
  | 'DE'
  | 'FR'
  | 'BE'
  | 'IE'
  | 'ES'
  | 'NL'
  | 'AT'
  | 'IT'
  | 'PT'
  | 'GB';

export const validatePaymentConfig = (
  amount: number,
  currency: Currency,
  country?: ValidCountry
): { isValid: boolean; error?: string } => {
  // Check if currency is supported
  if (!(currency in MIN_AMOUNTS)) {
    return {
      isValid: false,
      error: `${currency} is not supported. Supported currencies are: ${Object.keys(MIN_AMOUNTS).join(', ')}`,
    };
  }

  // Check minimum amount
  const minAmount = MIN_AMOUNTS[currency];
  if (amount < minAmount) {
    return {
      isValid: false,
      error: `Minimum amount for ${currency} is ${formatAmount(minAmount / 100, currency)}`,
    };
  }

  // Check currency-country combination
  if (country) {
    const validCountries = VALID_COUNTRY_CURRENCY[currency];
    if (!validCountries.includes(country)) {
      return {
        isValid: false,
        error: `${currency} is not supported for country ${country}. Valid countries for ${currency} are: ${validCountries.join(', ')}`,
      };
    }
  }

  return { isValid: true };
};

const formatAmount = (amount: number, currency: Currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
