import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password_hash: string;

  @Column({ type: "enum", enum: ["ADMIN", "OWNER", "DRIVER"] })
  role: "ADMIN" | "OWNER" | "DRIVER";

  @Column({
    type: "enum",
    enum: ["PENDING", "ACTIVE", "SUSPENDED"],
    default: "PENDING",
  })
  status: "PENDING" | "ACTIVE" | "SUSPENDED";

  @CreateDateColumn()
  created_at: Date;
}