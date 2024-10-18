import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1729208061337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
            "id" SERIAL PRIMARY KEY,
            "company_id" BIGINT NOT NULL,
            "name" VARCHAR(255) NOT NULL,
            "login" VARCHAR(255) NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            "roles" TEXT ARRAY DEFAULT '{USER}',
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deleted_at" TIMESTAMP
        );

        ALTER TABLE users
        ADD CONSTRAINT "FK_users_company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS users
    `);
  }
}
