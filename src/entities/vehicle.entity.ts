import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { name: 'company_id' })
  companyId: number;

  @Column({ length: '255', nullable: false })
  license: string;

  @Column({ length: '255', nullable: false })
  vin: string;

  @Column({ name: 'lat', type: 'double precision', nullable: true })
  lat: number;

  @Column({ name: 'long', type: 'double precision', nullable: true })
  long: number;

  @Column({ name: 'fuel_level', type: 'decimal', nullable: true })
  fuelLevel: number;

  @ManyToOne(() => Company, (companies) => companies.vehicles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;

  @Column({ name: 'tracking_enabled', type: 'boolean', default: false })
  trackingEnabled: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
