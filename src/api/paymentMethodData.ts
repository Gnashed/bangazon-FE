import { clientCredentials } from '@/utils/client';
import { PaymentMethodPayload, PaymentMethodResponse } from '@/types/api';

const endpoint = clientCredentials.databaseURL;

export const createPaymentMethod = async (payload: PaymentMethodPayload): Promise<PaymentMethodResponse> => {
  try {
    const response = await fetch(`${endpoint}/api/payment-method`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error code: ${response.status}`);
    }
    return await response.json() as PaymentMethodResponse;
    
  } catch (error) {
    console.error('There was a problem sending the POST request.', error);
    throw error;
  }
};
