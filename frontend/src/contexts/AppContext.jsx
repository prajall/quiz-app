"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultAppData = {
  user: null,
};

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(defaultAppData);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/getuser`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAppData((prev) => ({ ...prev, user: response.data }));
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      console.log(error);
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
