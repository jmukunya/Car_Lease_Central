import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service.js';
import { BillingController } from './billing.controller.js';
import { Invoice } from './entities/invoice.entity.js';
import { Lease } from '../leases/entities/lease.entity.js';
import { User } from '../users/entities/user.entity.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Lease, User]),  PassportModule.register({ defaultStrategy: "jwt" }),],
  providers: [BillingService],
  controllers: [BillingController],
})
export class BillingModule {}