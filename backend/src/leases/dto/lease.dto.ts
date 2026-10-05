import { IsUUID, IsNumber, IsDateString } from 'class-validator';

export class CreateLeaseDto {
  @IsUUID()
  driver_id: string;

  @IsUUID()
  vehicle_id: string;

  @IsDateString()
  start_date: string;

  @IsNumber()
  daily_rate: number;

  @IsNumber()
  security_deposit: number;
}

export class RefundDepositDto {
  @IsNumber()
  refund_amount: number;
}