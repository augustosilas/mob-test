import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateVehicleDTO {
  @ApiProperty({
    type: String,
    example: '1312132',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  license?: string;

  @ApiProperty({
    type: String,
    example: 'ASDAD21321ASD21',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  vin?: string;

  @ApiProperty({
    type: Number,
    example: 60,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  fuelLevel?: number;

  @ApiProperty({
    type: Number,
    example: 50.3001,
  })
  @Type(() => Number)
  @IsLatitude()
  @IsOptional()
  lat?: number;

  @ApiProperty({
    type: Number,
    example: -150.6841,
  })
  @Type(() => Number)
  @IsLongitude()
  @IsOptional()
  long?: number;
}
