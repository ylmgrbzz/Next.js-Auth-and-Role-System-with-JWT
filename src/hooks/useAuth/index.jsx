import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/libs/auth";

export const fromServer = async () => {
  const cookies = require("nest/headers").cookies;
  const cookieList = cookies();

  console.log("cookieList", cookieList.get("token"));

  const { value: token } = cookieList.get("token") ?? { value: null };

  const hasVerifiedToken = await verifyJwtToken(token);

  return hasVerifiedToken;
};

export function useAuth() {
  const [auth, setAuth] = useState(null);

  const getVerifiedToken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    const hasVerifiedToken = await verifyJwtToken(token);
    setAuth(hasVerifiedToken);
  };

  useEffect(() => {
    getVerifiedToken();
  }, []);

  return auth;
}

useAuth.fromServer = fromServer;
