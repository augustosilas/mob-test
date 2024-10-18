import 'dotenv/config';
import { CompanyRepository } from '../repositories/company.repository';
import { DataSource } from 'typeorm';
import { Company } from '../entities/company.entity';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { Vehicle } from '../entities/vehicle.entity';
import { AddCompanyTable1728941999311 } from './migrations/1728941999311-AddCompanyTable';
import { AddUserTable1729208061337 } from './migrations/1729208061337-AddUserTable';
import { AddVehicleTable1729208375395 } from './migrations/1729208375395-AddVehicleTable';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Company, User, Vehicle],
        migrations: [
          AddCompanyTable1728941999311,
          AddUserTable1729208061337,
          AddVehicleTable1729208375395,
        ],
        synchronize: false,
        migrationsRun: true,
      });

      return dataSource.initialize();
    },
  },
  CompanyRepository,
  UserRepository,
  VehicleRepository,
];
