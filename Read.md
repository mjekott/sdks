# Flick Payment SDK for React Native

A powerful and secure payment SDK for React Native applications that enables seamless integration of payment processing capabilities.

## Installation

```sh
npm install react-native-flick-react-native-sdk
```

## Usage

### Basic Implementation

#### Using FlickEuro Component

```jsx
import { FlickProvider, FlickEuro } from 'react-native-flick-react-native-sdk';

function EuroPaymentScreen() {
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
      <FlickEuro
        config={{
          amount: 1000, // Amount in cents
          cust_email: 'customer@example.com',
          country: 'DE', // Required for EUR payments
          iban: 'DE89370400440532013000', // Required for EUR payments
          full_name: 'John Doe', // Required for EUR payments
        }}
      />
    </FlickProvider>
  );
}
```

#### Using FlickPound Component

```jsx
import { FlickProvider, FlickPound } from 'react-native-flick-react-native-sdk';

function PoundPaymentScreen() {
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
      <FlickPound
        config={{
          amount: 500, // Amount in pence
          cust_email: 'customer@example.com',
          currency: 'GBP',
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

#### FlickEuro Props

| Prop       | Type   | Required | Description                     |
| ---------- | ------ | -------- | ------------------------------- |
| amount     | number | Yes      | Payment amount in cents         |
| cust_email | string | Yes      | Customer email address          |
| country    | string | Yes      | Country code (e.g., 'DE', 'FR') |
| iban       | string | Yes      | Customer's IBAN                 |
| full_name  | string | Yes      | Customer's full name            |

#### FlickPound Props

| Prop       | Type   | Required | Description             |
| ---------- | ------ | -------- | ----------------------- |
| amount     | number | Yes      | Payment amount in pence |
| cust_email | string | Yes      | Customer email address  |

### Validation Rules

#### Minimum Amounts

- GBP: Minimum 5.00 GBP (500 pence)
- EUR: Minimum 10.00 EUR (1000 cents)

#### Supported Country-Currency Combinations

- GBP: Only supported in GB (United Kingdom)
- EUR: Supported in DE, FR, BE, IE, ES, NL, AT, IT, PT (European countries)

#### Validation Errors

The SDK will automatically validate the payment configuration and return appropriate error messages for:

- Invalid currency
- Amount below minimum requirement
- Unsupported country-currency combination
- Missing required fields
- Invalid format for IBAN, sort code, or account number

## License

MIT
