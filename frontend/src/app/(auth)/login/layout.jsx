import { authChecker } from "@/authChecker";
import { redirect } from "next/navigation";

const LoginLayout = ({ children }) => {
  if (authChecker()) {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default LoginLayout;
