import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateVehicleDTO {
  @ApiProperty({
    type: String,
    example: '134684',
  })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  license: string;

  @ApiProperty({
    type: String,
    example: 'ASDAS231ASD21ASD',
  })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  vin: string;

  @ApiProperty({
    type: Number,
    example: 100,
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
