import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, jwtService: JwtService) { }
  
  async blockUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Target account profile target does not exist.');
    user.status = 'SUSPENDED';
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find({
      select:
      {
        id: true,
        email: true,
        role: true,
        status: true,
        created_at: true
      }
    });
  }
}