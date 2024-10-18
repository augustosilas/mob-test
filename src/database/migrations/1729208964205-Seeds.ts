import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeds1729208964205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO companies (id, name, address, phone)
        VALUES (1, 'Company 1', 'Address Company 1', '99999999999');

        INSERT INTO users (company_id, name, login, password, roles)
        VALUES (1, 'User Admin 1', 'user1_admin', '$2a$10$eLWMvmkruQxv59P1N8CGBeIzDgtEzqyJrY7K1DfLcZ1GuQmIEhjAG', '{ADMIN}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
