# Cray Finance Node.js SDK

A first-class Node.js/TypeScript package for integrating Cray Finance APIs. This package abstracts authentication, HTTP calls, validation, retries, and error handling, providing a clean and expressive API for developers.

## Requirements

- Node.js 14+
- TypeScript 4.5+ (if using TypeScript)

## Installation

Install the package via npm:

```bash
npm install cray-node
# OR (assuming local)
npm install ./cray-node
```

## Configuration

You can configure the client using environment variables or by passing arguments directly to the client.

### Using Environment Variables

Create a `.env` file in your project root:

```env
CRAY_API_KEY=your_api_key_here
CRAY_ENV=sandbox
CRAY_TIMEOUT=30
CRAY_RETRIES=2
```

### Environment Switching

Set `CRAY_ENV` to `live` for production or `sandbox` for development/staging.

- `sandbox`: Uses `https://dev-gateman.v3.connectramp.com`
- `live`: Uses `https://pay.connectramp.com`

## Usage

Import the `Cray` client to access all modules.

```typescript
import { Cray } from "cray-node";

// Initialize the client (automatically loads from env if not provided)
const cray = new Cray("your_api_key"); 
// OR just
// const cray = new Cray(); 
```

### 1. Cards

Handle card transactions including initiation, charging, and querying.

```typescript
// Initiate a card transaction
const response = await cray.cards.initiate({
    reference: '4aeb118e-5009-450a-94fc-d74f6cd88646',
    amount: '100',
    currency: 'USD',
    card_data: {
        pan: '5399832641760090',
        cvv: '146',
        expiryMonth: '05',
        expiryYear: '50',
    },
    customer_information: {
        email: 'test@testmail.com',
        firstName: 'John',
        lastName: 'Doe',
    }
});

// Process payment (Charge)
const charge = await cray.cards.charge({
    transaction_id: 'SRK4NC92PFHLGZW78A3E'
});

// Query transaction status
const status = await cray.cards.query('customer_reference_id');
```

### 2. Mobile Money (MoMo)

Process mobile money payments.

```typescript
// Initiate MoMo payment
const momo = await cray.momo.initiate({
    customer_reference: 'e4d7c3b8-5f29-4b46-81a6-8d98c1e75812',
    amount: '3950',
    currency: 'XOF',
    phone_no: '2290161248277',
    payment_provider: 'MTN',
    country: 'benin',
    firstname: 'Cray',
    lastname: 'Momo',
});

// Requery MoMo transaction
const status = await cray.momo.requery('customer_reference_id');
```

### 3. Wallets

Fetch wallet balances.

```typescript
// Get all wallet balances
const balances = await cray.wallets.balances();

// Get subaccounts
const subaccounts = await cray.wallets.subaccounts();
```

### 4. FX & Conversions

Handle exchange rates and currency conversions.

```typescript
// Get specific exchange rate
const rate = await cray.fx.rates({
    source_currency: 'USD',
    destination_currency: 'NGN'
});

// Get rates by destination
const rates = await cray.fx.ratesByDestination({
    destination_currency: 'NGN'
});

// Generate a quote
const quote = await cray.fx.quote({
    source_currency: 'NGN',
    destination_currency: 'USD',
    source_amount: 1500
});

// Execute conversion
const conversion = await cray.fx.convert({
    quote_id: 'quote:98a5d6d3-7cbc-4c7d-b4f6-d3bbbbe340b6'
});

// Query conversions history
const history = await cray.fx.conversions();
```

### 5. Payouts

Manage disbursements and transfers.

```typescript
// Get payment methods for a country
const methods = await cray.payouts.paymentMethods('NG');

// Get banks (optionally filter by country code)
const banks = await cray.payouts.banks('GH');

// Validate account name
const account = await cray.payouts.validateAccount({
    account_number: '0112345678',
    bank_code: '058',
    country_code: 'GH' // if applicable
});

// Disburse funds
const transfer = await cray.payouts.disburse({
    customer_reference: 'ref-123',
    account_number: '898789',
    bank_code: '78978',
    amount: '10',
    currency: 'NGN',
    narration: 'Payment for services',
    sender_info: { name: 'My Business' },
    recipient_name: 'John Doe'
});

// Requery payout
const status = await cray.payouts.requery('transaction_id');
```

### 6. Refunds

Initiate and track refunds.

```typescript
// Initiate a refund (full or partial)
const refund = await cray.refunds.initiate({
    pan: '4696660001638370',
    subaccount_id: '9999999999',
    amount: '1.2' // Optional, for partial refund
});

// Check refund status
const status = await cray.refunds.query('refund_reference_id');
```

## Error Handling

The package throws specific exceptions for different error scenarios.

```typescript
import { 
    CrayAuthenticationException,
    CrayValidationException,
    CrayTimeoutException,
    CrayApiException 
} from "cray-node";

try {
    const response = await cray.cards.initiate(payload);
} catch (error) {
    if (error instanceof CrayAuthenticationException) {
        // Handle invalid API key or unauthorized access
    } else if (error instanceof CrayValidationException) {
        // Handle validation errors
        // error.errors contains details
    } else if (error instanceof CrayTimeoutException) {
        // Handle timeouts
    } else if (error instanceof CrayApiException) {
        // Handle other API errors
    }
}
```

## License

The MIT License (MIT).
