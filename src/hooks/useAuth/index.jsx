import { verifyJwtToken } from "@/libs/auth";
import { cookies } from "next/headers";

export const fromServer = async () => {
  const cookieList = cookies();

  console.log("cookieList", cookieList.get("token"));

  const { value: token } = cookieList.get("token") ?? { value: null };

  const hasVerifiedToken = await verifyJwtToken(token);

  return hasVerifiedToken;
};

export function useAuth() {}

useAuth.fromServer = fromServer;
