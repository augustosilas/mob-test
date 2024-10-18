import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super(Company, dataSource.manager);
  }

  async findById(companyId: number) {
    return this.findOne({
      where: { id: companyId },
    });
  }

  async findByPhone(phone: string) {
    return this.findOne({
      where: { phone },
    });
  }
}
