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
 *=============================  Payment Method  =============================
 */

 interface PaymentMethod {
  id: number;
  cardNumber: string;
  securityCode: number;
  expirationDate: string;
  customerId: number;
  // customer: CustomerData;
 }

 export interface PaymentMethodPayload {
  cardNumber: string;
  securityCode: string;
  expirationDate: string;
  customerId: number;
 }

 export interface PaymentMethodResponse extends PaymentMethodPayload {
  id: number;
 }

/**
 *=============================  Customer  =============================
 */

 interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  userId: number;
  uid: string;
  paymentMethods: PaymentMethod[];
}

export interface CustomerData extends Customer {
  orders: OrderData[];
  // paymentMethods: PaymentMethods[];
}

/**
 *=============================  Product  =============================
 */

 // GET

 interface Seller {
  id: number;
  username: string;
  userId: number;
 };

interface Store {
  id: number;
  name: string;
  sellerId: number;
  seller: Seller;
  storeImageUrl: string;
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
  products: ProductData[];
};

/**
 *=============================  Seller  =============================
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SellerData extends Seller {};

/**
 *=============================  Order and OrderItems  =============================
 */
type OrderStatus = 'Order Received' | 'Packing Items' | 'Shipped' | 'Delivered' | 'Returned' | 'Canceled';

export interface OrderData {
  id: number;
  isCompleted: boolean;
  orderTotal: number;
  orderDate: string;
  customerId: number;
  customer: Customer;
  paymentMethodId: number;
  // paymentMethod: Payment;
  orderStatus: OrderStatus;
  estimatedDeliveryDate: string;
  orderItems: OrderItemsData[];
};

export interface OrderItemsData {
  orderId: number;
  // order: OrderData
  productId: number;
  product: ProductData;
  itemQuantity: number;
  store: StoreData;
}
