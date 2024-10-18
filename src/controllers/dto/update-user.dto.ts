import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    type: String,
    example: 'Jhon Jhon',
  })
  @Type(() => String)
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    example: 'email_correct@email.com',
  })
  @Type(() => String)
  @IsOptional()
  @IsEmail()
  login?: string;
}
