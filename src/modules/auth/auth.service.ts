import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { sendConfirmation } from "../../infra/email";
import {
  generateEmailConfirmationToken,
  generateToken,
  verifyEmailConfirmationToken,
} from "../../shared/utils/jwt";
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

    try {
      await sendConfirmation(
        savedUser.email,
        savedUser.name,
        generateEmailConfirmationToken(savedUser.id),
      );
    } catch {
      throw new InternalServerErrorException(
        "Unable to send the confirmation email",
      );
    }

    return savedUser;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
      select: {
        id: true,
        password: true,
        role: true,
        isActive: true,
        emailVerified: true,
        deletedAt: true,
        scheduledHardDeleteAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException("Email address is not confirmed");
    }

    if (user.deletedAt || user.scheduledHardDeleteAt) {
      await this.userRepository.restore(user.id);
      await this.userRepository.update(user.id, {
        isActive: true,
        scheduledHardDeleteAt: null,
      });
    } else if (!user.isActive) {
      throw new UnauthorizedException("Account is inactive");
    }

    return {
      message: "Login successful",
      token: generateToken(user.id, user.role),
    };
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    let userId: string;

    try {
      ({ userId } = verifyEmailConfirmationToken(token));
    } catch {
      throw new UnauthorizedException("Invalid or expired confirmation token");
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: true,
    });

    if (!user || user.deletedAt) {
      throw new UnauthorizedException("Invalid or expired confirmation token");
    }

    if (!user.emailVerified) {
      await this.userRepository.update(user.id, { emailVerified: true });
    }

    return { message: "Email confirmed successfully" };
  }
}
