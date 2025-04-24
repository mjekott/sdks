import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useFlick } from '../context/FlickProvider';
import useCheckTransactionStatus from '../hooks/useCheckTransactionStatus';
import useGetAuthorizationLink from '../hooks/useGetAuthorizationLink';
import useCreateSession from '../hooks/useInitializeSession';
import { type Bank, type FLickPoundButtonProps } from '../types';
import { formatAmount } from '../utils';
import AppLayout from './ui/AppLayout';
import { BankSelector } from './ui/BankList';
import CustomButton from './ui/CustomButton';

export const FlickPound = ({ config }: FLickPoundButtonProps) => {
  const { onError, onSuccess } = useFlick();
  const [visible, setVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank>();
  const [isLoading, setIsLoading] = useState(false);
  const getAuthorizationLink = useGetAuthorizationLink();
  const [transactionConfirmed, setTransactionConfirmed] = useState('');

  const { data, isLoading: isLoadingSession } = useCreateSession({
    ...config,
    currency: 'GBP',
  });
  const checkTransactionStatus = useCheckTransactionStatus(
    data?.data.data.transactionId,
    isLoading
  );

  useEffect(() => {
    if (data?.data.data.bankList && !data.data.data.isFirstTimePayer) {
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
    if (!selectedBank) {
      setVisible(true);
      return;
    }
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
    <AppLayout
      banks={
        !data?.data?.data || data?.data?.data?.isFirstTimePayer
          ? []
          : data.data.data.bankList.personalBanks.slice(0, 3)
      }
    >
      <CustomButton
        disabled={isLoadingSession || isLoading}
        title={
          transactionConfirmed.length > 0
            ? transactionConfirmed
            : `Pay ${formatAmount(config.amount / 100, 'GBP')}`
        }
        onPress={completeTransaction}
        isLoading={isLoading || isLoadingSession}
      />
      {!isLoadingSession && data?.data && transactionConfirmed.length === 0 && (
        <BankSelector
          disabled={isLoading || transactionConfirmed.length > 0}
          selectedBank={selectedBank}
          bankList={data?.data.data.bankList}
          setSelectedBank={setSelectedBank}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </AppLayout>
  );
};
