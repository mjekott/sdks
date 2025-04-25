import {
  FlickPound,
  FlickProvider,
  type TransactionData,
} from 'getflick-react-native';
import { StyleSheet, View } from 'react-native';
export default function App() {
  const handleError = (error: any) => {
    console.log(error);
  };

  const handleSuccess = (data: TransactionData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <FlickProvider
        environment="sandbox"
        apiKey="U2FsdGVkX1/zDxxcuZW3y3g5DOMykj7Sr4CECH8tbw1Jdzta1L0ISTYvzu0xPCbRpj8XaKbD5DUrEycuKWWXa6QcVXGygtrxe3ARt+xH68NXLeNylwyqzgQ2Mlu0ZKQf78rB49yWyqefevQ+HAET6+/UOCd+RDfzvADVtm1nw7KnfyiGA4gkrxtgTrIEEsP7/vxTs/Ir1rTBMcQDRVKcRQ=="
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <FlickPound
          config={{
            amount: 1000,
            cust_email: 'ekottmfon@yahoo.com',
            redirectUrl: 'payer://transaction-success',
          }}
        />
      </FlickProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
