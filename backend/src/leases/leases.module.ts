import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasesService } from './leases.service.js';
import { LeasesController } from './leases.controller.js';
import { Lease } from './entities/lease.entity.js';
import { Vehicle } from '../vehicles/entities/vehicle.entity.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Lease, Vehicle]),  PassportModule.register({ defaultStrategy: "jwt" }),],
  providers: [LeasesService],
  controllers: [LeasesController],
})
export class LeasesModule {}