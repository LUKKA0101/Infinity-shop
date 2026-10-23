import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import { User } from "../modules/user/user.entity";
import { AuthPayload } from "../types/auth.types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
        withDeleted: true,
        select: {
          id: true,
          role: true,
          isActive: true,
          emailVerified: true,
          deletedAt: true,
        },
      });

      if (!user || user.deletedAt || !user.isActive || !user.emailVerified) {
        throw new UnauthorizedException("UNAUTHORIZED");
      }

      request.user = {
        id: user.id,
        role: user.role,
      };

      return true;
    } catch {
      throw new UnauthorizedException("UNAUTHORIZED");
    }
  }
}
