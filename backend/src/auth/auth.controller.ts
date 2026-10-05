import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { LoginDto, RegisterDto } from "./dto/auth.dto.js";
import { JwtAuthGuard } from "./jwt-auth.guard.js";
import { CurrentUser } from "./current-user.decorator.js";
import { Public } from "./public.decorator.js";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("me")
  getProfile(@CurrentUser() user: any) {
    
    return user;
  }
  @Public()
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh(@Body("refreshToken") refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}
