import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../user.entity";

@Injectable()
export class RequestDeleteAccountValidator {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateDeleteRequest(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.deletedAt) {
      throw new BadRequestException(
        "This account already has a pending deletion request.",
      );
    }

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    user.scheduledHardDeleteAt = thirtyDaysFromNow;
    user.isActive = false;

    return this.userRepository.softRemove(user);
  }
}
