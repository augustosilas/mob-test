import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/signin.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @ApiTags('Auth')
  async signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }
}
