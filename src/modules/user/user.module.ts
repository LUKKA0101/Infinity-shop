import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthGuard } from "../../middlewares/auth.guard";
import { AccountCleanupCron } from "./infra/account-cleanup.cron";
import { UserControler } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { RequestDeleteAccountValidator } from "./validador/request-delete-account.validator";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    RequestDeleteAccountValidator,
    AccountCleanupCron,
    AuthGuard,
  ],
  controllers: [UserControler],
})
export class UserModule {}
