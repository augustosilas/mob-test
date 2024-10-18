import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    type: String,
    example: 'email@email.com',
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  login: string;

  @ApiProperty({
    type: String,
    example: 'super_secret',
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;
}
