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
