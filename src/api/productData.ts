import { clientCredentials } from "@/utils/client";
import { AllProductsData, SingleProductData, ProductsInCategoriesData } from "@/types/api";

const endpoint = clientCredentials.databaseURL;

const getLatestProducts = async (): Promise<AllProductsData[]> => {
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

const getSingleProduct = async (id: number): Promise<SingleProductData> => {
  try {
    const response = await fetch(`${endpoint}/api/product/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as SingleProductData;

  } catch (error) {
    console.error('There was a problem retrieving the requested product.', error);
    throw error;
  }
};

const getCategoriesWithProducts = async (): Promise<ProductsInCategoriesData[]> => {
  try {
    const response = await fetch(`${endpoint}/api/products/categories`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }

    return await response.json() as ProductsInCategoriesData[];

  } catch (error) {
    console.error('There was a problem retrieving the requested categories and its related products.', error);
    throw error;
  }
};

export { getLatestProducts, getSingleProduct, getCategoriesWithProducts };
