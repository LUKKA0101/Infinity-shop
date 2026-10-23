import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthGuard } from "../../middlewares/auth.guard";
import { User } from "../user/user.entity";
import { AddressController } from "./address.controller";
import { Address } from "./address.entity";
import { AddressService } from "./address.service";

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService, AuthGuard],
})
export class AddressModule {}
