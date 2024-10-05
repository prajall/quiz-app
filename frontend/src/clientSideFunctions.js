import axios from "axios";

export const getCookiesClient = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/getcookie`
    );
    if (response.status == 200) {
      const cookies = response.data;
      return cookies;
    }
    return false;
  } catch {
    console.log("Failed to get cookies");
  }
};

export const calculateTime = (inputSeconds) => {
  const seconds = inputSeconds % 60;
  const minute = Math.floor(inputSeconds / 60);
  return { seconds, minute };
};
