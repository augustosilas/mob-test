import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVehicleTable1729208375395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
            "id" SERIAL PRIMARY KEY,
            "company_id" BIGINT NOT NULL,
            "license" VARCHAR(255) NOT NULL,
            "vin" VARCHAR(255) NOT NULL,
            "lat" DOUBLE PRECISION,
            "long" DOUBLE PRECISION,
            "fuel_level" DECIMAL,
            "tracking_enabled" BOOLEAN NULL,
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deleted_at" TIMESTAMP
        );

        ALTER TABLE vehicles
        ADD CONSTRAINT "FK_vehicles_company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS vehicles
    `);
  }
}
