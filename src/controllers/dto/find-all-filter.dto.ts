import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, IsPositive } from 'class-validator';

export class FindAllFilterDTO {
  @ApiProperty({
    type: String,
    example: '10',
  })
  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  @IsPositive()
  limit?: string;

  @ApiProperty({
    type: String,
    example: '1',
  })
  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  @IsPositive()
  page?: string;
}
