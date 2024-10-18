import { Inject, Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super(Vehicle, dataSource.manager);
  }

  async findByVin(vin: string) {
    return this.findOne({
      where: {
        vin,
      },
    });
  }

  async findByVinAndCompanyId(params: { vin: string; companyId: number }) {
    return this.findOne({
      where: {
        vin: params.vin,
        companyId: params.companyId,
      },
    });
  }

  async findById(id: number) {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(dto: { companyId: number; limit?: number; page?: number }) {
    return this.find({
      where: { companyId: dto.companyId },
      skip: dto.limit * (dto.page - 1),
      take: dto.limit,
    });
  }
}
