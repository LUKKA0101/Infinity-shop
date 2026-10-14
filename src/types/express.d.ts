import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };

  address: {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
