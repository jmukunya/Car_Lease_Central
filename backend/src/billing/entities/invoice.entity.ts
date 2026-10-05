import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Lease } from '../../leases/entities/lease.entity.js';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lease_id: string;

  @ManyToOne(() => Lease)
  @JoinColumn({ name: 'lease_id' })
  lease: Lease;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_due: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
  late_fee: number;

  @Column({ default: false })
  is_paid: boolean;

  @Column({ type: 'date' })
  due_date: string;

  @CreateDateColumn()
  created_at: Date;
}