/**
 * Represents the configuration for initiating a checkout process.
 * @property {number} amount - The payment amount in the smallest unit of the currency (e.g., pence for GBP, cents for EUR)
 * @property {string} cust_email - The customer's email address
 * @property {Currency} currency - The currency code for the payment (GBP or EUR)
 * @property {Country} [country] - Optional country code. Required for certain currencies:
 *                                - GBP: Must be 'GB'
 *                                - EUR: Must be one of the supported European countries
 */
export type InitiateCheckout = {
  amount: number;
  cust_email: string;
  currency?: Currency;
};

export type InitiateCheckoutPound = {
  amount: number;
  cust_email: string;
};

export type InitiateCheckoutEuro = {
  amount: number;
  cust_email: string;
  currency: Currency;
  country?: Omit<Country, 'GB'>;
  iban: string;
  full_name: string;
};

/**
 * Props for the Flick component
 * @property {InitiateCheckout} config - The checkout configuration
 */
export type FLickPoundButtonProps = {
  config: InitiateCheckoutPound;
};

export type FLickEuroButtonProps = {
  config: InitiateCheckoutEuro;
};

export interface MediaItem {
  source: string;
  type: 'icon' | 'logo';
}

export interface Bank {
  id: string;
  name: string;
  fullName: string;
  media: MediaItem[];
}

export interface BankList {
  businessBanks: Bank[];
  personalBanks: Bank[];
}

/**
 * Represents the response data from a checkout process
 * @property {string} transactionId - Unique identifier for the transaction
 * @property {string} amount - The payment amount
 * @property {'GBP' | 'EUR'} currency - The currency used for the payment
 * @property {number} charges - Any additional charges applied
 * @property {string} redirectUrl - URL to redirect after payment
 * @property {string} webhookUrl - URL for payment status updates
 * @property {BankList} bankList - List of available banks for payment
 */
export interface CheckoutData {
  transactionId: string;
  amount: string;
  currency: 'GBP' | 'EUR';
  charges: number;
  redirectUrl: string;
  webhookUrl: string;
  bankList: BankList;
  isFirstTimePayer: boolean;
}

export interface CheckoutResponse {
  status: number;
  message: string;
  data: CheckoutData;
}

/**
 * Supported currencies in the payment system
 * @remarks
 * - GBP: British Pound Sterling (minimum 5.00 GBP)
 * - EUR: Euro (minimum 10.00 EUR)
 */
export type Currency = 'GBP' | 'EUR';

/**
 * Supported countries in the payment system
 * @remarks
 * Currency restrictions:
 * - GBP: Only supported in GB
 * - EUR: Supported in all listed European countries
 */
export type Country =
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

export interface GetInstitutions {
  status: number;
  message: string;
  data: BankList;
}

export interface InitiatePaymentAuth {
  institutionId: string;
  transactionId: string;
  iban?: string;
  fullname?: string;
}

export type InitiatePaymentAuthResponse = {
  status: string;
  data: {
    meta: {
      tracingId: string;
    };
    data: {
      id: string;
      userUuid: string;
      applicationUserId: string;
      institutionId: string;
      status: string;
      createdAt: string;
      featureScope: string[];
      state: string;
      institutionConsentId: string;
      authorisationUrl: string;
      qrCodeUrl: string;
    };
    redirectUrl: string;
  };
};

// File: types/index.ts

export interface Media {
  source: string;
  type: string;
}

export interface Bank {
  id: string;
  name: string;
  media: MediaItem[];
  countryCode: string;
  type: 'personal' | 'business';
}

export interface BankList {
  personalBanks: Bank[];
  businessBanks: Bank[];
}

/**
 * Represents session data for a payment
 * @property {string} amount - The payment amount
 * @property {string} currency - The currency used
 * @property {string} transactionId - Unique identifier for the transaction
 * @property {BankList} bankList - List of available banks
 */
export interface SessionData {
  amount: string;
  currency: string;
  transactionId: string;
  bankList: BankList;
  // Add other session data properties as needed
}

export interface SessionResponse {
  data: SessionData;
  // Add other response properties as needed
}

export interface AuthorizationParams {
  amount: string;
  institutionId: string;
  transactionId: string;
  countryCode: string;
}

export interface AuthorizationData {
  authorisationUrl: string;
  // Add other authorization data properties as needed
}

export interface AuthorizationResponse {
  data: {
    data: AuthorizationData;
  };
}

export type BankTabType = 'personal' | 'business';

/**
 * Context type for the Flick payment provider
 * @property {Bank} [customerBank] - The selected bank for payment
 * @property {(error: any) => void} [onError] - Callback for error handling
 */
export interface FlickContextType {
  customerBank?: Bank;
  onError?: (error: any) => void;
  // Add other context properties as needed
}

/**
 * Represents transaction data
 * @property {string} transaction_amount - The amount of the transaction
 * @property {string} transaction_ref - Reference number for the transaction
 * @property {string} email - Customer's email
 * @property {string} transaction_status - Status of the transaction
 * @property {string} description - Description of the transaction
 * @property {string} currency - Currency used
 * @property {string} country_code - Country code
 * @property {string} polling_phase - Current phase of the transaction
 * @property {string} created_at - Timestamp of transaction creation
 * @property {string} status - Current status
 * @property {string} merchant_name - Name of the merchant
 */
export interface TransactionData {
  transaction_amount: string;
  transaction_ref: string;
  email: string;
  transaction_status: string;
  description: string;
  currency: string;
  country_code: string;
  polling_phase: string;
  created_at: string;
  status: string;
  merchant_name: string;
  institution_id: boolean;
}

export interface ConfirmTransactionResponse {
  status: number;
  data: {
    status: number;
    success: boolean;
    message: string;
    data: TransactionData;
  };
}
