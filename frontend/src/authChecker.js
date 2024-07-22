import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const authChecker = () => {
  const userToken = cookies().get("token");
  if (userToken) {
    return userToken;
  } else {
    console.log("Please Login to perform this action");
    redirect("/login");
    return false;
  }
};
