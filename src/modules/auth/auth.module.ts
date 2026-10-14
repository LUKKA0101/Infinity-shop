import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Cart } from "../cart/cart.entity";
import { User } from "../user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "5h" },
    }),
  ],
  providers: [AuthService, PasswordService],
  exports: [AuthService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}
