import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useFlick } from '../context/FlickProvider';
import useCheckTransactionStatus from '../hooks/useCheckTransactionStatus';
import useGetAuthorizationLink from '../hooks/useGetAuthorizationLink';
import useCreateSession from '../hooks/useInitializeSession';
import { type Bank, type FLickButtonProps } from '../types';
import { formatAmount } from '../utils';
import AppLayout from './ui/AppLayout';
import { BankSelector } from './ui/BankList';
import CustomButton from './ui/CustomButton';

export const FlickPoundCollection = ({ config }: FLickButtonProps) => {
  const { onError, onSuccess } = useFlick();
  const [selectedBank, setSelectedBank] = useState<Bank>();
  const [isLoading, setIsLoading] = useState(false);
  const getAuthorizationLink = useGetAuthorizationLink();
  const [transactionConfirmed, setTransactionConfirmed] = useState('');

  const { data, isLoading: isLoadingSession } = useCreateSession(config);
  const checkTransactionStatus = useCheckTransactionStatus(
    data?.data.data.transactionId,
    isLoading
  );

  useEffect(() => {
    if (data?.data.data.bankList) {
      setSelectedBank(data?.data?.data.bankList.personalBanks[0]);
    }
  }, [data]);

  useEffect(() => {
    const transactionData = checkTransactionStatus.data?.data.data.data;

    if (
      !transactionData ||
      transactionData?.description === 'Awaiting Payer Authorization'
    )
      return;

    if (transactionData?.description === 'Awaiting Validation By Payer Bank') {
      setIsLoading(false);
      setTransactionConfirmed('Payment Initiated');
      onSuccess?.(transactionData);
    } else if (transactionData?.transaction_status === 'failed') {
      setIsLoading(false);
      setTransactionConfirmed('Payment Failed');
      onError?.(new Error(transactionData?.description));
    }
  }, [checkTransactionStatus.data]);

  const completeTransaction = async () => {
    setIsLoading(true);
    try {
      const response: any = await getAuthorizationLink.mutateAsync({
        institutionId: selectedBank?.id as string,
        transactionId: data?.data.data.transactionId as string,
      });

      Linking.openURL(response.data.data.authorisationUrl);
    } catch (error: any) {
      onError?.(error.message);
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <CustomButton
        disabled={isLoadingSession || isLoading || !selectedBank}
        title={
          transactionConfirmed.length > 0
            ? transactionConfirmed
            : `Pay ${formatAmount(config.amount / 100, config.currency)}`
        }
        onPress={completeTransaction}
        isLoading={isLoading || isLoadingSession}
      />
      {selectedBank &&
        !isLoadingSession &&
        data?.data &&
        transactionConfirmed.length === 0 && (
          <BankSelector
            disabled={isLoading || transactionConfirmed.length > 0}
            selectedBank={selectedBank}
            bankList={data?.data.data.bankList}
            setSelectedBank={setSelectedBank}
          />
        )}
    </AppLayout>
  );
};
