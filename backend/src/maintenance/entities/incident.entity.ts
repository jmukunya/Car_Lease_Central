import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Lease } from '../../leases/entities/lease.entity.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('incidents')
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lease_id: string;

  @ManyToOne(() => Lease)
  @JoinColumn({ name: 'lease_id' })
  lease: Lease;

  @Column()
  reported_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reported_by' })
  reporter: User;

  @Column({ type: 'enum', enum: ['DEFECT', 'ACCIDENT', 'SCHEDULED_SERVICE'] })
  type: 'DEFECT' | 'ACCIDENT' | 'SCHEDULED_SERVICE';

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
  liable_cost: number;

  @Column({ type: 'enum', enum: ['REPORTED', 'IN_REPAIR', 'RESOLVED'], default: 'REPORTED' })
  status: 'REPORTED' | 'IN_REPAIR' | 'RESOLVED';

  @CreateDateColumn()
  created_at: Date;
}