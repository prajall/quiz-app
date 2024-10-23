"use client";

import axios from "axios";
import { useEffect } from "react";

export default function CheckCookies() {
  const checkCookies = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response);
  };
  useEffect(() => {
    checkCookies();
  }, []);

  return <div>CheckCookies</div>;
}
