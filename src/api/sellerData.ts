import { clientCredentials } from '@/utils/client';
import { SellerData } from '@/types/api';

const endpoint = clientCredentials.databaseURL;

export const getSingleSellerById = async (id: number): Promise<SellerData> => {
  try {
    const response = await fetch(`${endpoint}/api/seller/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }
    return await response.json() as SellerData;

  } catch (error) {
    console.error('There was a problem retrieving the requested seller.', error);
    throw error;
  }
};
