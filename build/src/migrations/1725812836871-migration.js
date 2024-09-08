"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1725812836871 = void 0;
class Migration1725812836871 {
    constructor() {
        this.name = 'Migration1725812836871';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."User_platform_enum" AS ENUM('android', 'ios', 'web')`);
        await queryRunner.query(`CREATE TYPE "public"."User_role_enum" AS ENUM('user', 'admin', 'super_admin')`);
        await queryRunner.query(`CREATE TABLE "User" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "pin" character varying NOT NULL, "phone" character varying NOT NULL, "transactionPin" character varying NOT NULL DEFAULT '', "verified" boolean NOT NULL DEFAULT false, "privateKey" character varying NOT NULL DEFAULT '', "resetToken" character varying NOT NULL DEFAULT '', "resetTokenExpiry" bigint NOT NULL DEFAULT '10000', "dob" character varying NOT NULL DEFAULT '', "isAdmin" boolean NOT NULL DEFAULT false, "deviceId" character varying NOT NULL DEFAULT '', "deviceIp" character varying NOT NULL DEFAULT '', "deviceModel" character varying NOT NULL DEFAULT '', "platform" "public"."User_platform_enum" NOT NULL DEFAULT 'android', "lastLoggedIn" character varying NOT NULL DEFAULT '', "beneficiaries" text, "role" "public"."User_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Wallet" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL DEFAULT '0', "userId" uuid, CONSTRAINT "REL_2f7aa51d6746fc8fc8ed63ddfb" UNIQUE ("userId"), CONSTRAINT "PK_8828fa4047435abf9287ff0e89e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Email" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "verifyToken" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "verifyTokenExpiry" bigint NOT NULL DEFAULT '900002', "valid" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_62cb0b2ff4f8d5ee9e3e9cdf5de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transactions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "amount" integer NOT NULL DEFAULT '0', "type" character varying NOT NULL, "status" character varying NOT NULL, "reference" character varying NOT NULL, "narration" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Wallet" ADD CONSTRAINT "FK_2f7aa51d6746fc8fc8ed63ddfbc" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_f01450fedf7507118ad25dcf41e" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_f01450fedf7507118ad25dcf41e"`);
        await queryRunner.query(`ALTER TABLE "Wallet" DROP CONSTRAINT "FK_2f7aa51d6746fc8fc8ed63ddfbc"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
        await queryRunner.query(`DROP TABLE "Email"`);
        await queryRunner.query(`DROP TABLE "Wallet"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TYPE "public"."User_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."User_platform_enum"`);
    }
}
exports.Migration1725812836871 = Migration1725812836871;
//# sourceMappingURL=1725812836871-migration.js.map