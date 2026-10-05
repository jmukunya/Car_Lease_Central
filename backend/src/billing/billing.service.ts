import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Invoice } from './entities/invoice.entity.js';
import { Lease } from '../leases/entities/lease.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Lease) private leaseRepo: Repository<Lease>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async executeAutomatedMidnightBillingCycle() {
    this.logger.log('CRON: Launching automated structural lease billing checks matrix...');
    const todayStr = new Date().toISOString().split('T')[0];

    const activeLeases = await this.leaseRepo.find({ where: { status: 'ACTIVE' } });
    for (const lease of activeLeases) {
      const dailyInvoice = this.invoiceRepo.create({
        lease_id: lease.id,
        amount_due: lease.daily_rate,
        due_date: todayStr,
        is_paid: false
      });
      await this.invoiceRepo.save(dailyInvoice);
    }

    const overdueInvoices = await this.invoiceRepo.find({
      where: { is_paid: false, due_date: LessThan(todayStr) },
      relations: { lease: true }
    });

    for (const invoice of overdueInvoices) {
      invoice.late_fee = Number(invoice.amount_due) * 0.10; 
      await this.invoiceRepo.save(invoice);

      const consecutiveBreachesCount = await this.invoiceRepo.count({
        where: { lease_id: invoice.lease_id, is_paid: false }
      });

      if (consecutiveBreachesCount >= 5) {
        await this.userRepo.update(invoice.lease.driver_id, { status: 'SUSPENDED' });
        this.logger.warn(`CRON: Security Perimeter Action -> Suspended Driver: ${invoice.lease.driver_id}`);
      }
    }
  }

  async payInvoice(invoiceId: string) {
    const invoice = await this.invoiceRepo.findOne({ where: { id: invoiceId } });
    if (!invoice) throw new NotFoundException('Invoice record reference absent.');
    invoice.is_paid = true;
    return this.invoiceRepo.save(invoice);
  }

  async fetchUnpaidDriverInvoices(driverId: string) {
    return this.invoiceRepo.find({
      where: { is_paid: false, lease: { driver_id: driverId } },
      relations: {lease:true}
    });
  }

  async fetchAllInvoices() {
    return this.invoiceRepo.find();
  }
}