import { IsString, IsArray, IsOptional } from 'class-validator';

export class OnboardVehicleDto {
  @IsString()
  owner_id: string;

  @IsString()
  make_model_year: string;

  @IsString()
  license_plate: string;

  @IsArray()
  @IsOptional()
  document_urls?: string[];
}