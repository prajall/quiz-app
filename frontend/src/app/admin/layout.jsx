import React from "react";

const layout = ({ children }) => {
  //todo: check if user is logged in
  //todo: check if user is admin
  //todo: if not admin, redirect to home page
  return <div>{children}</div>;
};

export default layout;
