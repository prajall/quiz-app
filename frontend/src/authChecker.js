import axios from "axios";

export const authChecker = async () => {
  const user = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getUserInfo`
  );
  if (user) {
    return user;
  } else {
    return false;
  }
};
