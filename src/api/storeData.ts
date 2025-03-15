import { clientCredentials } from "@/utils/client";
import { StoreData } from "@/types/api";

const endpoint = clientCredentials.databaseURL;

export const getSingleStoreById = async (id: number): Promise<StoreData> => {
  try {
    const response = await fetch(`${endpoint}/api/store/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }
    return await response.json() as StoreData;

  } catch (error) {
    console.error('There was a problem retrieving the requested store.', error);
    throw error;
  }
};
