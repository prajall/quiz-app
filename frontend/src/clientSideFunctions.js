import axios from "axios";

export const getCookiesClient = async () => {
  try {
    const response = await axios.get("http://localhost:3001/user/getcookie");
    console.log(response);
    if (response.status == 200) {
      const cookies = response.data;
      return cookies;
    }
    return false;
  } catch {
    console.log("Failed to get cookies");
  }
};
