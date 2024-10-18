import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({
    type: String,
    example: 'Jhon Doe',
  })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'email@email.com',
  })
  @Type(() => String)
  @IsNotEmpty()
  @IsEmail()
  login: string;

  @ApiProperty({
    type: String,
    example: 'secret',
  })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    example: 'secret',
  })
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
