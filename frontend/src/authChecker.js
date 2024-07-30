import { cookies } from "next/headers";

export const authChecker = () => {
  const userToken = cookies().get("token");
  if (userToken) {
    return userToken;
  } else {
    return false;
  }
};
