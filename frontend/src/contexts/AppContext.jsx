"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultAppData = {
  user: null,
  isLoading: true,
  examhallUser: null,
};

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(defaultAppData);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/auth`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data && response.data.success) {
        setAppData((prev) => ({ ...prev, user: response.data.data }));
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      console.log(error);
    } finally {
      setAppData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const fetchExamhallUser = async () => {
    try {
      console.log("AppData:", appData);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/info`,
        {
          headers: {
            etutor_id: appData.user.id,
          },
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        setAppData((prev) => ({ ...prev, examhallUser: response.data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (appData.user) {
      fetchExamhallUser();
    }
  }, [appData.user]);

  useEffect(() => {
    console.log("Appdata updated:", appData);
  }, [appData]);

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
