import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async checkPassword(fromLogin: string, fromDB: string) {
    return await bcrypt.compare(fromLogin, fromDB);
  }

  async signIn(dto: { login: string; password: string }) {
    const user = await this.userRepository.findByLogin(dto.login);
    if (!user || !(await this.checkPassword(dto.password, user.password)))
      throw new HttpException(
        { msg: 'auth.error.invalid_login' },
        HttpStatus.BAD_REQUEST,
      );
    const payload = {
      id: user.id,
      companyId: user.companyId,
      roles: user.roles,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
