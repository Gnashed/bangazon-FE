import { clientCredentials } from "@/utils/client";
import { OrderData } from "@/types/api";

const endpoint = clientCredentials.databaseURL;

export const getCustomerOrdersByCustomerId = async (customerId: number): Promise<OrderData[]> => {
  try {
    const response = await fetch(`${endpoint}/api/customer/${customerId}/orders`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as OrderData[];

  } catch (error) {
    console.error('There was a problem retrieving all the customer\'s orders.', error);
    throw error;
  }
};

export const getOrderById = async (orderId: number): Promise<OrderData> => {
  try {
    const response = await fetch(`${endpoint}/api/order/${orderId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as OrderData;
    
  } catch (error) {
    console.error('There was a problem retrieving the order items.', error);
    throw error;
  }
};
