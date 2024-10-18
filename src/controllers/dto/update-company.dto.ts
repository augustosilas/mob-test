import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDTO {
  @ApiProperty({
    type: String,
    example: 'C.A Company',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    example: 'Rua 30',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: String,
    example: '99999999999',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  phone?: string;
}
