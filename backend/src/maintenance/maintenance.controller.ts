import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { MaintenanceService } from './maintenance.service.js';
import { ReportIncidentDto, ChargeDamageDto } from './dto/incident.dto.js';

@Controller('maintenance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaintenanceController {
  constructor(private maintenanceService: MaintenanceService) {}

  @Post('report')
  @Roles('DRIVER')
  driverReportIncident(@Body() dto: ReportIncidentDto, @Request() req) {
    return this.maintenanceService.report(dto, req.user.id);
  }

  @Patch('incident/:id/charge')
  @Roles('ADMIN')
  assessLiabilityFee(@Param('id') id: string, @Body() dto: ChargeDamageDto) {
    return this.maintenanceService.evaluateFine(id, dto);
  }

  @Patch('incident/:id/repair')
  @Roles('ADMIN')
  dispatchToWorkshop(@Param('id') id: string) {
    return this.maintenanceService.scheduleService(id);
  }

  @Get()
  @Roles('ADMIN')
  getSystemIncidents() {
    return this.maintenanceService.listAll();
  }
}