import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyTable1728941999311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS companies (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL,
            "address" VARCHAR(255) NOT NULL,
            "phone" VARCHAR(255) NOT NULL,
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deleted_at" TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS companies
    `);
  }
}
