import { clientCredentials } from "@/utils/client";

const endpoint = clientCredentials.databaseURL;

const getUsers = async (uid: string) => {
  try {
    const response = await fetch(`${endpoint}/users?uid="${uid}"`);
    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
  }
};

export default getUsers;
