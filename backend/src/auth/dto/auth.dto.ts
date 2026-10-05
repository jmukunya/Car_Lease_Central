import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['ADMIN', 'OWNER', 'DRIVER'])
  role: 'ADMIN' | 'OWNER' | 'DRIVER';
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}