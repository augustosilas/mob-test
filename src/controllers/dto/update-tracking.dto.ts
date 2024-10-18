import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrackingDTO {
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
    example: 50.3001,
  })
  @Type(() => Number)
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    type: Number,
    example: -150.62561,
  })
  @Type(() => Number)
  @IsLongitude()
  @IsNotEmpty()
  longitude: number;
}
