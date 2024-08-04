import axios from "axios";

export const authChecker = async () => {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getuser`
  );
  if (user) {
    return user;
  } else {
    return false;
  }
};
