import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { toResponse } from "../../shared/utils/to-dto";
import { UserResponseDto } from "./dto/user.dto";
import { updateUserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return toResponse(UserResponseDto, user);
  }

  async updateByUser(id: string, updateDto: updateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    Object.assign(user, updateDto);
    await this.userRepository.save(user);

    return toResponse(UserResponseDto, user);
  }

  async scheduleHardDelete(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const now = new Date();
    now.setDate(now.getDate() + 30);

    await this.userRepository.update(id, {
      scheduledHardDeleteAt: now,
      isActive: false,
    });

    await this.userRepository.softDelete(id);

    return {
      message: "Account deletion scheduled for 30 days from now",
      scheduledHardDeleteAt: now,
    };
  }
}
