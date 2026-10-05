import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service.js';
import { VehiclesController } from './vehicles.controller.js';
import { Vehicle } from './entities/vehicle.entity.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]),  PassportModule.register({ defaultStrategy: "jwt" }),],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}