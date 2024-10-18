import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super(User, dataSource.manager);
  }

  async findByLogin(login: string) {
    return this.findOne({
      where: { login },
    });
  }

  async findByLoginAndCompany(params: { login: string; companyId: number }) {
    return this.findOne({
      where: { login: params.login, companyId: params.companyId },
    });
  }

  async findById(id: number) {
    return this.findOne({
      where: { id },
    });
  }

  async findAll(dto: { companyId: number; limit?: number; page?: number }) {
    const users = await this.find({
      where: { companyId: dto.companyId },
      select: {
        companyId: true,
        id: true,
        login: true,
        name: true,
        createdAt: true,
      },
      skip: dto.limit * (dto.page - 1),
      take: dto.limit,
    });
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
