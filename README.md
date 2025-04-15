# Flick Payment SDK for React Native

A powerful and secure payment SDK for React Native applications that enables seamless integration of payment processing capabilities.

## Features

- Secure payment processing
- Support for multiple currencies
- Easy integration with React Native applications
- Production and sandbox environments
- Comprehensive error handling
- TypeScript support

## Installation

```sh
npm install react-native-flick-react-native-sdk
```

## Usage

### Basic Implementation

```jsx
import {
  FlickProvider,
  FlickPoundCollection,
} from 'react-native-flick-react-native-sdk';

function PaymentScreen() {
  const handleError = (error) => {
    console.error('Payment Error:', error);
  };

  const handleSuccess = (data) => {
    console.log('Payment Success:', data);
  };

  return (
    <FlickProvider
      environment="production"
      apiKey="YOUR_API_KEY"
      onError={handleError}
      onSuccess={handleSuccess}
    >
      <FlickPoundCollection
        config={{
          amount: 500,
          currency: 'GBP',
          cust_email: 'customer@example.com',
        }}
      />
    </FlickProvider>
  );
}
```

### Configuration Options

| Prop        | Type                      | Required | Description                         |
| ----------- | ------------------------- | -------- | ----------------------------------- |
| environment | 'production' \| 'sandbox' | Yes      | The environment to use for payments |
| apiKey      | string                    | Yes      | Your Flick API key                  |
| onError     | function                  | Yes      | Callback for payment errors         |
| onSuccess   | function                  | Yes      | Callback for successful payments    |
| amount      | number                    | Yes      | Payment amount                      |
| currency    | string                    | Yes      | Payment currency (e.g., 'GBP')      |
| cust_email  | string                    | Yes      | Customer email address              |

## License

MIT
