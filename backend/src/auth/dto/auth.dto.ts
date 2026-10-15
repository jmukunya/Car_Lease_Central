import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(["ADMIN", "OWNER", "DRIVER", "SERVICE_PROVIDER"])
  role: "ADMIN" | "OWNER" | "DRIVER" | "SERVICE_PROVIDER";
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}