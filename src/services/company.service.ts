import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(dto: { name: string; address: string; phone: string }) {
    const company = await this.companyRepository.findByPhone(dto.phone);
    if (company)
      throw new HttpException(
        { msg: 'company.error.already_exists_with_number' },
        HttpStatus.NOT_FOUND,
      );
    return this.companyRepository.save(dto);
  }

  async delete(companyId: number) {
    const company = await this.findById(companyId);
    if (!company)
      throw new HttpException(
        { msg: 'company.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    await this.companyRepository.softDelete(companyId);
  }

  async findById(companyId: number) {
    const company = await this.companyRepository.findById(companyId);
    if (!company)
      throw new HttpException(
        { msg: 'company.error.not_found' },
        HttpStatus.NOT_FOUND,
      );
    return company;
  }

  async update(data: {
    companyId: number;
    name?: string;
    address?: string;
    phone?: string;
  }) {
    const company = await this.findById(data.companyId);
    company.name = data.name ?? company.name;
    company.address = data.address ?? company.address;
    if (data.phone) {
      const companyByPhone = await this.companyRepository.findByPhone(
        data.phone,
      );
      if (companyByPhone)
        throw new HttpException(
          { msg: 'company.error.already_exists_with_number' },
          HttpStatus.NOT_FOUND,
        );
      company.phone = data.phone;
    }
    await this.companyRepository.update(data.companyId, company);
  }
}
