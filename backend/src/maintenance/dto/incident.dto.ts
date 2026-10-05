import { IsUUID, IsString, IsEnum, IsNumber } from 'class-validator';

export class ReportIncidentDto {
  @IsUUID()
  lease_id: string;

  @IsEnum(['DEFECT', 'ACCIDENT'])
  type: 'DEFECT' | 'ACCIDENT';

  @IsString()
  description: string;
}

export class ChargeDamageDto {
  @IsNumber()
  liable_cost: number;
}