import { clientCredentials } from "@/utils/client";
import { 
  UserPayload, 
  UserResponse,
  UserData
} from "@/types/api";

const endpoint = clientCredentials.databaseURL;

const createUserData = async (payload: UserPayload): Promise<UserResponse> => {
  try {
    const response = await fetch(`${endpoint}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // If an HTTP error code is sent back to the client...
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }
    // Here we need to explicitly set the type to UserReponse
    return await response.json() as UserResponse;

  } catch (error) {
    console.error("There was an error creating the user data: ", error);
    // Since there is an explicit return type <UserResponse>, we need to "throw error" so that if an error does happen, it can actually give us the information about it. Without it, the return type will be implicitly 'undefined'.
    throw error;
  }
};

const getSingleUserData = async (id: number): Promise<UserData> => {
  try {
    const response = await fetch(`${endpoint}/user/${id}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error code: ${response.status}`);
    }
    // const data: UserData = await response.json();
    // return data;
    return await response.json() as UserData;
    
  } catch (error) {
    console.error('Something went wrong retrieving the user data.', error)
    throw error;
  }
};

export { createUserData, getSingleUserData };
