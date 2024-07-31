"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

const defaultAppData = {
  user: null,
};

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(defaultAppData);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/getuser", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setAppData((prev) => ({ ...prev, user: response.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
