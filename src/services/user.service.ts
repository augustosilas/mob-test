import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { CompanyRepository } from '../repositories/company.repository';
import { RoleType } from 'src/security/role-type';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(dto: {
    companyId: number;
    name: string;
    login: string;
    password: string;
    isAdmin?: boolean;
  }) {
    const company = await this.companyRepository.findById(dto.companyId);
    if (!company)
      throw new HttpException(
        { msg: 'company.not_found' },
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userRepository.findByLoginAndCompany({
      login: dto.login,
      companyId: dto.companyId,
    });
    if (user)
      throw new HttpException(
        { msg: 'user.error.already_exists' },
        HttpStatus.BAD_REQUEST,
      );
    dto.password = await this.hashPassword(dto.password);
    const createdUser = await this.userRepository.save({
      companyId: company.id,
      login: dto.login,
      name: dto.name,
      password: dto.password,
      roles: dto?.isAdmin ? [RoleType.ADMIN] : [RoleType.USER],
    });
    delete createdUser.password;
    return createdUser;
  }

  async findById(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new HttpException(
        { msg: 'user.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async update(dto: { userId: number; name?: string; login?: string }) {
    const user = await this.userRepository.findById(dto.userId);
    if (!user)
      throw new HttpException(
        { msg: 'user.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    if (dto.login) {
      const findedUser = await this.userRepository.findByLogin(dto.login);
      if (findedUser)
        throw new HttpException(
          { msg: 'user.error.already_exists_with_login' },
          HttpStatus.BAD_REQUEST,
        );
    }
    user.login = dto.login ?? user.login;
    user.name = dto.name ?? user.name;
    return this.userRepository.update(dto.userId, user);
  }

  async delete(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new HttpException(
        { msg: 'user.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    await this.userRepository.softDelete(userId);
  }

  async findAll(dto: { companyId: number; limit?: number; page?: number }) {
    return this.userRepository.findAll(dto);
  }

  async findByLogin(login: string) {
    return this.userRepository.findByLogin(login);
  }
}
