import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

import { AuthPayload } from "../types/auth.types";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("TOKEN MISSING");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as AuthPayload;

      request.user = {
        userId: decoded.userId,
        authType: decoded.authType,
      };

      return true;
    } catch {
      throw new UnauthorizedException("UNAUTHORIZED");
    }
  }
}
