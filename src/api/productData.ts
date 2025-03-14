import { clientCredentials } from "@/utils/client";
import { AllProductsData } from "@/types/api";

const endpoint = clientCredentials.databaseURL;

export const getLatestProducts = async (): Promise<AllProductsData[]> => {
  try {
    const response = await fetch(`${endpoint}/api/products/latest`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as AllProductsData[];

  } catch (error) {
    console.error('There was a problem retrieving all products.', error);
    throw error;
  }
};
