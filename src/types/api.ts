/**
 *=============================  USER  =============================
 */

// POST
export interface UserPayload {
  uid: string;
  isSeller: boolean;
};

export interface UserResponse {
  id: number;
  uid: string;
  isSeller: boolean;
};

// GET
export interface UserData {
  id: number;
  uid: string;
  isSeller: boolean;
};

export interface UserDataByUid {
  id: number;
  uid: string;
  isSeller: boolean;
}

/**
 *=============================  Products  =============================
 */

 // GET

 interface Seller {
  id: number;
  storeId: number;
  username: string;
  userId: number;
 };

interface Store {
  id: number;
  name: string;
  sellerId: number;
  seller: Seller;
};

interface ProductData {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  quanityAvailable: number;
  storeId: number;
  imageUrl: string;
  dateCompleted: string;
  store: Store;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AllProductsData extends ProductData {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LatestProductsData extends ProductData {

};
