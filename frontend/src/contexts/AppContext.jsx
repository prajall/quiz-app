"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultAppData = {
  user: null,
  isLoading: true,
  exams: null,
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

  const fetchExams = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/exam/admin`
      );

      if (response.status == 200) {
        setAppData((prev) => ({ ...prev, exams: response.data }));
      }
    } catch (error) {
      console.log(error);
      if (error.message && error.message === "Network Error") {
        toast.error("Failed to connect to the server");
      } else {
        toast.error("Failed to fetch Exams");
      }
    } finally {
      setAppData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchExams();
  }, []);

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
