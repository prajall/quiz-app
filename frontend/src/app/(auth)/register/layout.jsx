import { authChecker } from "@/authChecker";
import { redirect } from "next/navigation";

const RegisterLayout = ({ children }) => {
  // if (authChecker()) {
  //   redirect("/");
  // }

  return <div>{children}</div>;
};

export default RegisterLayout;
