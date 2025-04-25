import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useContext, useMemo } from 'react';
import { httpClient } from '../api/httpClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type PaymentProviderConfig = {
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
};

const FlickContext = createContext<PaymentProviderConfig | null>(null);

export type FlickProviderProps = {
  children: React.ReactNode;
  environment: 'production' | 'sandbox';
  apiKey: string;
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
};

export const FlickProvider = ({
  children,
  apiKey,
  environment,
  onError,
  onSuccess,
}: FlickProviderProps) => {
  httpClient.defaults.headers.authorization = `Bearer ${apiKey}`;
  httpClient.defaults.baseURL =
    environment === 'production'
      ? 'https://1mgy6330f9.execute-api.us-east-2.amazonaws.com/production//global-payment/europe'
      : 'https://1mgy6330f9.execute-api.us-east-2.amazonaws.com/production//global-payment/europe/sandbox';

  const value = useMemo(
    () => ({
      onError,
      onSuccess,
    }),
    [onError, onSuccess]
  );

  return (
    <FlickContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </FlickContext.Provider>
  );
};

export const useFlick = () => {
  const context = useContext(FlickContext);
  if (!context) {
    throw new Error('Component  must be used within a FlickProvider');
  }
  return context;
};
