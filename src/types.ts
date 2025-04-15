export type InitiateCheckout = {
  amount: number;
  cust_email: string;
  currency: Currency;
};

export type FLickButtonProps = {
  config: InitiateCheckout;
}

export interface MediaItem {
  source: string;
  type: "icon" | "logo";
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

export interface CheckoutData {
  transactionId: string;
  amount: string;
  currency: "GBP" | "EUR";
  charges: number;
  redirectUrl: string;
  webhookUrl: string;
  bankList: BankList;
}

export interface CheckoutResponse {
  status: number;
  message: string;
  data: CheckoutData;
}

export type Currency = "GBP" | "EUR" | "USD";

export interface GetInstitutions {
  status: number;
  message: string;
  data: BankList;
}

export interface InitiatePaymentAuth {
  institutionId: string;
  transactionId: string;
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
  type: "personal" | "business";
}

export interface BankList {
  personalBanks: Bank[];
  businessBanks: Bank[];
}

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

export type BankTabType = "personal" | "business";

export interface FlickContextType {
  customerBank?: Bank;
  onError?: (error: any) => void;
  // Add other context properties as needed
}

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
