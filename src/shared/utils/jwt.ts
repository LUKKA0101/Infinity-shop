import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret =
  process.env.JWT_SECRET ||
  (() => {
    throw new Error("JWT_SECRET is not defined in environment variables");
  })();

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function generateToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: "2h",
  });
}
