import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Vehicle } from '../../vehicles/entities/vehicle.entity.js';

@Entity('leases')
export class Lease {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  driver_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'driver_id' })
  driver: User;

  @Column()
  vehicle_id: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  daily_rate: number;

  @Column('decimal', { precision: 10, scale: 2 })
  security_deposit: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
  deposit_refunded: number;

  @Column({ type: 'enum', enum: ['PENDING_REQUIREMENTS', 'ACTIVE', 'NOTICE_SENT', 'TERMINATED'], default: 'PENDING_REQUIREMENTS' })
  status: 'PENDING_REQUIREMENTS' | 'ACTIVE' | 'NOTICE_SENT' | 'TERMINATED';

  @CreateDateColumn()
  created_at: Date;
}