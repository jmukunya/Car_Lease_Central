import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity.js';
import { OnboardVehicleDto } from './dto/vehicle.dto.js';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>) { }

  async onboard(dto: OnboardVehicleDto) {
    const car = this.vehicleRepo.create({ ...dto, status: 'PENDING_APPROVAL' });
    return this.vehicleRepo.save(car);
  }

  async activatePending(id: string) {
    const car = await this.vehicleRepo.findOne({ where: { id } });
    console.log(car);
    if (!car) throw new NotFoundException('Vehicle target record not found.');
    car.status = 'AVAILABLE';
    return this.vehicleRepo.save(car);
  }

  async findByOwner(ownerId: string) {
    return this.vehicleRepo.find({ where: { owner_id: ownerId } });
  }

  async findAll() {
    return this.vehicleRepo.find({
      relations: {
        owner: true,
      }
    });
  }
}