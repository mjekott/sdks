# Flick Payment SDK for React Native

A powerful and secure payment SDK for React Native applications that enables seamless integration of payment processing capabilities. This SDK provides a simple way to implement payment processing in your React Native applications with support for both GBP and EUR currencies.

## Features

- 🔒 Secure payment processing
- 💰 Support for GBP and EUR currencies
- 🌍 Multi-country support for European payments
- 🎯 Simple and intuitive API
- ⚡ Real-time payment status updates
- 🔄 Automatic validation and error handling
- 📱 Native UI components

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Implementation](#basic-implementation)
  - [Configuration Options](#configuration-options)
  - [Validation Rules](#validation-rules)
- [Troubleshooting](#troubleshooting)
- [Support](#support)
- [License](#license)

## Installation

```sh
# Using npm
npm install react-native-flick-react-native-sdk

# Using yarn
yarn add react-native-flick-react-native-sdk
```

After installation, you'll need to link the native dependencies:

```sh
# For iOS
cd ios && pod install && cd ..

# For Android
# No additional steps required
```

## Usage

### Basic Implementation

#### Using FlickPound Component

```jsx
import { FlickProvider, FlickPound } from 'react-native-flick-react-native-sdk';

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

## Troubleshooting

### Common Issues

1. **Payment Fails to Process**

   - Verify your API key is correct
   - Check if the amount meets minimum requirements
   - Ensure all required fields are provided

2. **Component Not Rendering**

   - Verify the SDK is properly installed
   - Check for any console errors
   - Ensure you're using the correct environment

3. **Validation Errors**
   - Double-check all input values
   - Verify currency and country combinations
   - Ensure IBAN format is correct

## Support

For support, please:

1. Check the [documentation](https://docs.flick.com)
2. Open an issue on our [GitHub repository](https://github.com/flick/react-native-sdk)
3. Contact our support team at support@flick.com

## License

MIT
