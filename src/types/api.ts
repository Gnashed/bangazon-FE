/**
 *=============================  USER  =============================
 */

// POST
export interface UserPayload {
  uid: string;
  isSeller: boolean;
};

export interface UserResponse extends UserPayload {
  id: number;
};

// GET
export interface UserData {
  id: number;
  uid: string;
  isSeller: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserDataByUid extends UserData {}

/**
 *=============================  Product  =============================
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
  quantityAvailable: number;
  storeId: number;
  imageUrl: string;
  dateCompleted: string;
  store: Store;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AllProductsData extends ProductData {};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LatestProductsData extends ProductData {};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SingleProductData extends ProductData {};

/**
 *=============================  Store  =============================
 */

export interface StoreData extends Store {
  storeImageUrl: string;
};

/**
 *=============================  Seller  =============================
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SellerData extends Seller {};
