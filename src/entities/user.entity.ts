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

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { name: 'company_id' })
  companyId: number;

  @Column({ length: '255', nullable: false })
  name: string;

  @Column({ length: '255', nullable: false })
  login: string;

  @Column({ length: '255', nullable: false })
  password: string;

  @ManyToOne(() => Company, (companies) => companies.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;

  @Column('text', { array: true, default: ['USER'], nullable: true })
  roles: string[];

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
