import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../api/httpClient";
import { CheckoutResponse, InitiateCheckout } from "../types";

const useCreateSession = (data: InitiateCheckout) => {
  return useQuery({
    queryKey: ["initialize-session", data],
    staleTime: 1000,
    queryFn: () => {
      return httpClient.post<CheckoutResponse>(
        `/global-payment/europe/create-authentication-session`,
        { ...data, amount: String(data.amount) }
      );
    },
  });
};

export default useCreateSession;
