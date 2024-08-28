import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secretkey = process.env.JWT_SECRET;

  if (!secretkey) {
    throw new Error("JWT_SECRET is not defined");
  }

  return new TextEncoder().encode(secretkey);
};

export async function verifyJwtToken(token) {
  try {
    const decoded = await jwtVerify(token, getJwtSecretKey());
    return decoded;
  } catch (error) {
    return null;
  }
}
