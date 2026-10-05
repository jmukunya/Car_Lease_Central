import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { JwtStrategy } from "./jwt.strategy.js";
import { User } from "../users/entities/user.entity.js";
import { HashingService } from "./hashing.service.js";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthGuard } from "./jwt-auth.guard.js";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      global: true,
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    HashingService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService, HashingService],
})
export class AuthModule {}
