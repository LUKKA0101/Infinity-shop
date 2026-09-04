export const enum AuthType {
  USER = "user",
  ADMIN = "admin",
  SUPPORT = "support",
}

export interface AuthPayload {
  userId: string;
  authType: AuthType;
}
