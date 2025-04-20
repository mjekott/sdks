import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../api/httpClient';
import { useFlick } from '../context/FlickProvider';
import type {
  InitiatePaymentAuth,
  InitiatePaymentAuthResponse,
} from '../types';

const useGetAuthorizationLink = () => {
  const { onError } = useFlick();
  return useMutation({
    mutationFn: async (payload: InitiatePaymentAuth) => {
      console.log('payload', payload);
      return httpClient.post<InitiatePaymentAuthResponse>(
        '/global-payment/europe/create-payment-authorization',
        payload
      );
    },
    onError: (error: any) => {
      onError?.(error.response.data.message);
    },
  });
};

export default useGetAuthorizationLink;
