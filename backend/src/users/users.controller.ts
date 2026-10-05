import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { UsersService } from './users.service.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  @Roles('ADMIN')
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Patch(':id/block')
  @Roles('ADMIN')
  blockAccount(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }

}