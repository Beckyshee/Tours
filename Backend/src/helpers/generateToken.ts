import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET as string;

export const generateToken = (
  email: string,
  UserID: string,
  fullname: string,
  role: string
): string => {
  return jwt.sign(
    {
      fullname,
      email,
      UserID,
      role,
    },
    secretKey,
    { expiresIn: "24h" }
  );
};
