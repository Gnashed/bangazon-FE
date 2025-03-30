import { clientCredentials } from "@/utils/client";
import { OrderData, OrderPayload, OrderResponse, OrderItemsData } from "@/types/api";

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

export const getOrdersByCustomerUid = async (uid: string): Promise<OrderData[]> => {
  try {
    const response = await fetch(`${endpoint}/api/orders/history?uid=${uid}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as OrderData[];
    
  } catch (error) {
    console.error('There was a problem retrieving the order items.', error);
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
    console.error('There was a problem retrieving the customer\'s orders.', error);
    throw error;
  }
};

export const createOrder = async (payload: OrderPayload, orderItemsPayload: OrderItemsData[]): Promise<OrderResponse> => {
  try {
    const response = await fetch(`${endpoint}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        orderItems: orderItemsPayload
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as OrderResponse;

  } catch (error) {
    console.error('There was a problem sending a POST request order.', error);
    throw error;
  }
}
