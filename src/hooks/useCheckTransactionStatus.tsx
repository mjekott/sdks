import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../api/httpClient';
import type { ConfirmTransactionResponse } from '../types';

const useCheckTransactionStatus = (
  transactionId?: string,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ['transaction-status', transactionId],
    queryFn: async () =>
      httpClient.get<ConfirmTransactionResponse>(
        `/query-status?transactionId=${transactionId}`
      ),
    refetchInterval: 8000,
    enabled: !!transactionId && enabled,
  });
};

export default useCheckTransactionStatus;
