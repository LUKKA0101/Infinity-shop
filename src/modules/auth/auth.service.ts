import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { generateToken } from "../../utils/jwt";
import { Cart } from "../cart/cart.entity";
import { CreateUserDto } from "../user/dto/user.dto";
import { User } from "../user/user.entity";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
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

    const passwordHash = await this.passwordService.hash(userDto.password);

    const user = this.userRepository.create({
      ...userDto,
      password: passwordHash,
    });

    const savedUser = await this.userRepository.save(user);

    const cart = this.cartRepository.create({ user: savedUser });
    await this.cartRepository.save(cart);

    return savedUser;
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
