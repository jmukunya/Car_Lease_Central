import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity.js';
import { Vehicle } from '../vehicles/entities/vehicle.entity.js';
import { ReportIncidentDto, ChargeDamageDto } from './dto/incident.dto.js';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Incident) private incidentRepo: Repository<Incident>,
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>
  ) {}

  async report(dto: ReportIncidentDto, userId: string) {
    const issue = this.incidentRepo.create({ ...dto, reported_by: userId, status: 'REPORTED' });
    return this.incidentRepo.save(issue);
  }

  async evaluateFine(id: string, dto: ChargeDamageDto) {
    const issue = await this.incidentRepo.findOne({ where: { id } });
    if (!issue) throw new NotFoundException('Incident target record absent.');
    issue.liable_cost = dto.liable_cost;
    return this.incidentRepo.save(issue);
  }

  async scheduleService(id: string) {
    const issue = await this.incidentRepo.findOne({ where: { id }, relations: { lease: true } });
    if (!issue) throw new NotFoundException('Incident record trace matching broken.');
    
    issue.status = 'IN_REPAIR';
    await this.vehicleRepo.update(issue.lease.vehicle_id, { status: 'MAINTENANCE' });
    return this.incidentRepo.save(issue);
  }

  async listAll() {
    return this.incidentRepo.find({
      relations: {
        lease:true,
        },
    });
  }
}