import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../user/user.entity";
import { AddressController } from "./address.controller";
import { Address } from "./address.entity";
import { AddressService } from "./address.service";

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
