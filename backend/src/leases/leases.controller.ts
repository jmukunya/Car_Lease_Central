import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { LeasesService } from './leases.service.js';
import { CreateLeaseDto, RefundDepositDto } from './dto/lease.dto.js';

@Controller('leases')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeasesController {
  constructor(private leasesService: LeasesService) {}

  @Post()
  @Roles('ADMIN')
  assignCarToDriver(@Body() dto: CreateLeaseDto) {
    return this.leasesService.createContract(dto);
  }

  @Patch(':id/terminate-notice')
  @Roles('DRIVER')
  noticeOfTermination(@Param('id') id: string) {
    return this.leasesService.sendTerminationNotice(id);
  }

  @Patch(':id/refund-deposit')
  @Roles('ADMIN')
  payoutDeposit(@Param('id') id: string, @Body() dto: RefundDepositDto) {
    return this.leasesService.finalizeRefund(id, dto);
  }

  @Get('driver/:id')
  @Roles('DRIVER')
  getDriverActiveContracts(@Param('id') id) {
    return this.leasesService.getDriverLeases(id);
  }

  @Get('owner/:id')
  @Roles('OWNER')
  getOwnerActiveContracts(@Param('id') id) {
    return this.leasesService.getOwnerLeases(id);
  }
}