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

export function generateEmailConfirmationToken(userId: string) {
  return jwt.sign({ userId, purpose: "email-confirmation" }, JWT_SECRET, {
    expiresIn: "24h",
  });
}

export function verifyEmailConfirmationToken(token: string): {
  userId: string;
} {
  const payload = jwt.verify(token, JWT_SECRET);

  if (
    typeof payload === "string" ||
    payload.purpose !== "email-confirmation" ||
    typeof payload.userId !== "string"
  ) {
    throw new Error("Invalid email confirmation token");
  }

  return { userId: payload.userId };
}
