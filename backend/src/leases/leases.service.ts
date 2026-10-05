import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lease } from './entities/lease.entity.js';
import { Vehicle } from '../vehicles/entities/vehicle.entity.js';
import { CreateLeaseDto, RefundDepositDto } from './dto/lease.dto.js';

@Injectable()
export class LeasesService {
  constructor(
    @InjectRepository(Lease) private leaseRepo: Repository<Lease>,
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>
  ) {}

  async createContract(dto: CreateLeaseDto) {
    const car = await this.vehicleRepo.findOne({ where: { id: dto.vehicle_id } });
    if (!car || car.status !== 'AVAILABLE') {
      throw new BadRequestException('Vehicle target is currently not available for assignment.');
    }

    const lease = this.leaseRepo.create({ ...dto, status: 'ACTIVE' });
    car.status = 'LEASED';
    await this.vehicleRepo.save(car);
    return this.leaseRepo.save(lease);
  }

  async sendTerminationNotice(driverId: string) {
    const contract = await this.leaseRepo.findOne({ where: {driver_id: driverId } });
    if (!contract) throw new NotFoundException('Active target contract allocation match missing.');
    contract.status = 'NOTICE_SENT';
    return this.leaseRepo.save(contract);
  }

  async finalizeRefund(id: string, dto: RefundDepositDto) {
    const contract = await this.leaseRepo.findOne({ where: { id }, relations: { vehicle: true } });
    if (!contract) throw new NotFoundException('Contract targeted trace not resolved.');
    if (dto.refund_amount > contract.security_deposit) {
      throw new BadRequestException('Refund scale metric cannot exceed initialized intake deposit.');
    }

    contract.deposit_refunded = dto.refund_amount;
    contract.status = 'TERMINATED';
    contract.vehicle.status = 'AVAILABLE';
    
    await this.vehicleRepo.save(contract.vehicle);
    return this.leaseRepo.save(contract);
  }

  async getDriverLeases(driverId: string) {
    return this.leaseRepo.find({ where: { driver_id: driverId }, relations: {vehicle:true} });
  }

  async getOwnerLeases(ownerId: string) {
    return this.leaseRepo.find({
      where: { vehicle: { owner_id: ownerId } }, relations: {
        vehicle: true,
        driver: true
      }
    });
  }
}