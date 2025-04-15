import { useMutation } from "@tanstack/react-query";

import { httpClient } from "../api/httpClient";
import { InitiatePaymentAuth, InitiatePaymentAuthResponse } from "../types";

const useGetAuthorizationLink = () => {
  return useMutation({
    mutationFn: async (payload: InitiatePaymentAuth) =>
      httpClient.post<InitiatePaymentAuthResponse>(
        "/global-payment/europe/create-payment-authorization",
        payload
      ),
  });
};

export default useGetAuthorizationLink;
