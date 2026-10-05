import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator.js';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  
  canActivate(context: ExecutionContext) {
    // Check if the route or controller has the @Public() decorator attached
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Bypass authentication completely
    }

    // Otherwise, execute the passport JWT validation engine normally
    return super.canActivate(context) as boolean;
  }
  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          "Authentication credentials missing or invalid",
        )
      );
    }
    if (user.status === "SUSPENDED") {
      throw new UnauthorizedException(
        "This account profile has been locked for policy violations.",
      );
    }
    return user;
  }
}