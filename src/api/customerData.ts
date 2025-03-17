import { clientCredentials } from "@/utils/client";
import { CustomerData } from "@/types/api";

const endpoint = clientCredentials.databaseURL;

export const getCustomerByUid = async (uid: string) => {
  try {
    const response = await fetch(`${endpoint}/api/customer?uid=${uid}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }
    return await response.json() as CustomerData;

  } catch (error) {
    console.error('There was a problem retrieving the customer by Uid.', error);
    throw error;
  }
};
