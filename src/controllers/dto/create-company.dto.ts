import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateCompanyDTO {
  @ApiProperty({
    type: String,
    example: 'C.A',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiProperty({
    type: String,
    example: 'Rua 10, Jr. Joca',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  address: string;

  @ApiProperty({
    type: String,
    example: '99999999999',
  })
  @IsString()
  @IsNotEmpty()
  @Max(13)
  @Type(() => String)
  phone: string;
}
