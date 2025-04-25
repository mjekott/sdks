# Flick Payment SDK for React Native

A powerful and secure payment SDK for React Native applications that enables seamless integration of payment processing capabilities.

## Installation

```sh
npm install getflick-react-native
```

## Usage

### Basic Implementation

#### Using FlickPound Component

```jsx
import { FlickProvider, FlickPound } from 'getflick-react-native';

function PoundPaymentScreen() {
  const handleError = (error) => {
    console.error('Payment Error:', error);
    // Handle error appropriately
  };

  const handleSuccess = (data) => {
    console.log('Payment Success:', data);
    // Handle successful payment
  };

  return (
    <FlickProvider
      environment="production"
      apiKey="YOUR_API_KEY"
      onError={handleError}
      onSuccess={handleSuccess}
    >
      <FlickPound
        config={{
          amount: 500, // Amount in pence
          cust_email: 'customer@example.com',
          currency: 'GBP',
          redirectUrl: 'payer://confirm-send',
        }}
      />
    </FlickProvider>
  );
}
```

### Configuration Options

#### FlickProvider Props

| Prop        | Type                      | Required | Description                         |
| ----------- | ------------------------- | -------- | ----------------------------------- |
| environment | 'production' \| 'sandbox' | Yes      | The environment to use for payments |
| apiKey      | string                    | Yes      | Your Flick API key                  |
| onError     | function                  | Yes      | Callback for payment errors         |
| onSuccess   | function                  | Yes      | Callback for successful payments    |

#### FlickPound Props

| Prop        | Type   | Required | Description                      |
| ----------- | ------ | -------- | -------------------------------- |
| amount      | number | Yes      | Payment amount in pence          |
| cust_email  | string | Yes      | Customer email address           |
| redirectUrl | string | No       | Redirect url after authorization |

#### Minimum Amounts

- GBP: Minimum 5.00 GBP (500 pence)

## License

MIT
