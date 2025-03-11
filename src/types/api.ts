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
