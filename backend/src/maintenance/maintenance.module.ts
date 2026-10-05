import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceService } from './maintenance.service.js';
import { MaintenanceController } from './maintenance.controller.js';
import { Incident } from './entities/incident.entity.js';
import { Vehicle } from '../vehicles/entities/vehicle.entity.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, Vehicle]),  PassportModule.register({ defaultStrategy: "jwt" }),],
  providers: [MaintenanceService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}