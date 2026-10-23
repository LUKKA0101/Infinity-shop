import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, Repository } from "typeorm";

import { User } from "../user.entity";

@Injectable()
export class AccountCleanupCron {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleAccountCleanup() {
    const now = new Date();

    const expiredAccounts = await this.userRepository.find({
      where: {
        scheduledHardDeleteAt: LessThanOrEqual(now),
      },
      withDeleted: true,
    });

    for (const user of expiredAccounts) {
      await this.userRepository.remove(user);
    }
  }
}
