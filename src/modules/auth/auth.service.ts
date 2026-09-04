import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { generateToken } from "../../utils/jwt";
import { CreateUserDto } from "../user/dto/user.dto";
import { User } from "../user/user.entity";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } });
  }

  async signUp(userDto: CreateUserDto): Promise<User> {
    const userEmailExists = await this.emailExists(userDto.email);

    if (userEmailExists) {
      throw new ConflictException("User already exists");
    }

    if (await this.emailExists(userDto.email)) {
      throw new ConflictException("Email already in use");
    }

    const passwordHash = await this.passwordService.hash(userDto.password);

    return this.userRepository.save({
      ...userDto,
      password: passwordHash,
    });
  }

  async signIn(email: string): Promise<{ message: string; token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return {
      message: "Login successful",
      token: generateToken(user.id, user.role),
    };
  }
}
