import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  make_model_year: string;

  @Column({ unique: true })
  license_plate: string;

  @Column('text', { array: true, default: '{}' })
  document_urls: string[];

  @Column({ type: 'enum', enum: ['PENDING_APPROVAL', 'AVAILABLE', 'LEASED', 'MAINTENANCE'], default: 'PENDING_APPROVAL' })
  status: 'PENDING_APPROVAL' | 'AVAILABLE' | 'LEASED' | 'MAINTENANCE';

  @CreateDateColumn()
  created_at: Date;
}