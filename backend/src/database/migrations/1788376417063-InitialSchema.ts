import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1788376417063 implements MigrationInterface {
    name = 'InitialSchema1788376417063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'OWNER', 'DRIVER')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_status_enum" AS ENUM('PENDING_APPROVAL', 'AVAILABLE', 'LEASED', 'MAINTENANCE')`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" uuid NOT NULL, "make_model_year" character varying NOT NULL, "license_plate" character varying NOT NULL, "document_urls" text array NOT NULL DEFAULT '{}', "status" "public"."vehicles_status_enum" NOT NULL DEFAULT 'PENDING_APPROVAL', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7e9fab2e8625b63613f67bd706c" UNIQUE ("license_plate"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."leases_status_enum" AS ENUM('PENDING_REQUIREMENTS', 'ACTIVE', 'NOTICE_SENT', 'TERMINATED')`);
        await queryRunner.query(`CREATE TABLE "leases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "driver_id" uuid NOT NULL, "vehicle_id" uuid NOT NULL, "start_date" date NOT NULL, "end_date" date, "daily_rate" numeric(10,2) NOT NULL, "security_deposit" numeric(10,2) NOT NULL, "deposit_refunded" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."leases_status_enum" NOT NULL DEFAULT 'PENDING_REQUIREMENTS', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2668e338ab2d27079170ea55ea2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lease_id" uuid NOT NULL, "amount_due" numeric(10,2) NOT NULL, "late_fee" numeric(10,2) NOT NULL DEFAULT '0', "is_paid" boolean NOT NULL DEFAULT false, "due_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."incidents_type_enum" AS ENUM('DEFECT', 'ACCIDENT', 'SCHEDULED_SERVICE')`);
        await queryRunner.query(`CREATE TYPE "public"."incidents_status_enum" AS ENUM('REPORTED', 'IN_REPAIR', 'RESOLVED')`);
        await queryRunner.query(`CREATE TABLE "incidents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lease_id" uuid NOT NULL, "reported_by" uuid NOT NULL, "type" "public"."incidents_type_enum" NOT NULL, "description" text NOT NULL, "liable_cost" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."incidents_status_enum" NOT NULL DEFAULT 'REPORTED', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ccb34c01719889017e2246469f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_490a6fd6eb12a0a64e87b534dd9" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leases" ADD CONSTRAINT "FK_14ef8a925f2e77488eb65caf572" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leases" ADD CONSTRAINT "FK_f2f974103d1fe6a7b043e3dc45f" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_da309569f957adb1f09c8bb1095" FOREIGN KEY ("lease_id") REFERENCES "leases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "incidents" ADD CONSTRAINT "FK_863a3c256c28a6f10afcb195b48" FOREIGN KEY ("lease_id") REFERENCES "leases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "incidents" ADD CONSTRAINT "FK_3ebe443aa45fa27fd71ed165e04" FOREIGN KEY ("reported_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidents" DROP CONSTRAINT "FK_3ebe443aa45fa27fd71ed165e04"`);
        await queryRunner.query(`ALTER TABLE "incidents" DROP CONSTRAINT "FK_863a3c256c28a6f10afcb195b48"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_da309569f957adb1f09c8bb1095"`);
        await queryRunner.query(`ALTER TABLE "leases" DROP CONSTRAINT "FK_f2f974103d1fe6a7b043e3dc45f"`);
        await queryRunner.query(`ALTER TABLE "leases" DROP CONSTRAINT "FK_14ef8a925f2e77488eb65caf572"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_490a6fd6eb12a0a64e87b534dd9"`);
        await queryRunner.query(`DROP TABLE "incidents"`);
        await queryRunner.query(`DROP TYPE "public"."incidents_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."incidents_type_enum"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "leases"`);
        await queryRunner.query(`DROP TYPE "public"."leases_status_enum"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
