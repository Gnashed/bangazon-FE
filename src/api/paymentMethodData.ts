import { clientCredentials } from '@/utils/client';
import { PaymentMethodPayload, PaymentMethodResponse, PaymentMethodData } from '@/types/api';

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

export const getCustomerPaymentMethods = async (customerId: number): Promise<PaymentMethodData[]> => {
  try {
    const response = await fetch(`${endpoint}/api/payment-methods?customerId=${customerId}`)

    if (!response.ok) {
      throw new Error(`HTTP Error code: ${response.status}`);
    }

    return await response.json() as PaymentMethodData[];
    
  } catch (error) {
    console.error('There was a problem sending the GET request.', error);
    throw error;
  }
};

export const deletePaymentMethod = async (paymentMethodId: number) => {
  try {
    const response = await fetch(`${endpoint}/api/payment-method/${paymentMethodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error status code: ${response.status}`);
    }

    return response.json;

  } catch (error) {
    console.error('There was a problem deleting the requested item.', error);
    throw error;
  }
}
