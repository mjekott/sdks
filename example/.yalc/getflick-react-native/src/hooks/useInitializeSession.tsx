import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../api/httpClient';
import { useFlick } from '../context/FlickProvider';
import type {
  CheckoutResponse,
  InitiateCheckoutEuro,
  InitiateCheckoutPound,
} from '../types';

const useCreateSession = (
  data: InitiateCheckoutEuro | InitiateCheckoutPound
) => {
  const { onError } = useFlick();
  return useQuery({
    queryKey: ['initialize-session', data],
    staleTime: 1000,
    enabled: !!data.amount && !!data.cust_email,
    queryFn: async () => {
      try {
        const response = await httpClient.post<CheckoutResponse>(
          `/create-authentication-session`,
          { ...data, amount: String(data.amount) }
        );
        return response;
      } catch (error: any) {
        onError?.(error.response.data.message);
        return null;
      }
    },
  });
};

export default useCreateSession;
