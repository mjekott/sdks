import { StyleSheet, View } from 'react-native';
import { Flick, FlickProvider } from 'react-native-flick-react-native-sdk';
export default function App() {
  const handleError = (error: any) => {
    console.log(error);
  };

  const handleSuccess = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <FlickProvider
        environment="production"
        apiKey="U2FsdGVkX1/zDxxcuZW3y3g5DOMykj7Sr4CECH8tbw1Jdzta1L0ISTYvzu0xPCbRpj8XaKbD5DUrEycuKWWXa6QcVXGygtrxe3ARt+xH68NXLeNylwyqzgQ2Mlu0ZKQf78rB49yWyqefevQ+HAET6+/UOCd+RDfzvADVtm1nw7KnfyiGA4gkrxtgTrIEEsP7/vxTs/Ir1rTBMcQDRVKcRQ=="
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <Flick
          config={{
            amount: 1000,
            currency: 'EUR',
            cust_email: 'ekottmfon@gmail.com',
            country: 'GB',
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
  },
});
