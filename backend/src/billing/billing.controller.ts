import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { BillingService } from './billing.service.js';

@Controller('billing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  @Roles('ADMIN')
  getAllInvoices() {
    return this.billingService.fetchAllInvoices();
  }
 
  @Get('driver/:id/unpaid/')
  @Roles('DRIVER')
  getUnpaidBalances(@Param('id') id) {
    return this.billingService.fetchUnpaidDriverInvoices(id);
  }

  @Patch('invoice/:id/pay')
  @Roles('DRIVER')
  processRentalPayment(@Param('id') id: string) {
    return this.billingService.payInvoice(id);
  }
}