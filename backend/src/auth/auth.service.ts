import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity.js";
import { LoginDto, RegisterDto } from "./dto/auth.dto.js";
import { HashingService } from "./hashing.service.js";
import { jwtConstants } from "./constants.js";
import { Request } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) { }
  

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists)
      throw new BadRequestException("Email address already registered.");

    const user = this.userRepo.create({
      email: dto.email,
      password_hash: await this.hashingService.hashPassword(dto.password),
      role: dto.role,
      status: dto.role === "ADMIN" ? "ACTIVE" : "PENDING",
    });
    return this.userRepo.save(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (
      !user ||
      !(await this.hashingService.comparePassword(
        dto.password,
        user.password_hash,
      ))
    ) {
      throw new UnauthorizedException(
        "Access denied. Invalid credentials provided.",
      );
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    const { accessToken, refreshToken } = await this.generateTokens(
      payload.sub,
      payload.email,
      payload.role,
    );

    return {
      tokens: { accessToken, refreshToken },
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  }

  async refreshTokens(refreshToken: string) {
      try {
        // Verify the access token against its unique secret
        const payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: jwtConstants.accessSecret,
        });

        return await this.generateTokens(payload.sub, payload.email);
      } catch (error) {
        throw new Error("Invalid or Expired Refresh Token");
      }
  }

  async generateTokens(userId: string, email: string, type?: string) {
    const payload = { sub: userId, email: email };
    let accessToken: string, refreshToken: string;

    switch (type) {
      case "access":
        // 1. Generate short-lived Access Token only
        accessToken = this.jwtService.sign(payload, {
          secret: jwtConstants.accessSecret,
          expiresIn: "15m",
        });
        
        return { accessToken };

      default:
        // 1. Generate both tokens
        accessToken = this.jwtService.sign(payload, {
          secret: jwtConstants.accessSecret,
          expiresIn: "15m",
        });

        refreshToken = this.jwtService.sign(payload, {
          secret: jwtConstants.refreshSecret,
          expiresIn: "7d",
        });

        return {
          accessToken,
          refreshToken,
        };
    }
  }
}
