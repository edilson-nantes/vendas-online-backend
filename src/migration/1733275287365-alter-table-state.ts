import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableState1733275287365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE IF EXISTS state
                ADD uf varchar(2) NOT NULL;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE IF EXISTS state
                DROP uf;
        `)
    }

}
