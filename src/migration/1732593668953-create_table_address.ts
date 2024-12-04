import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1732593668953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.address_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            CREATE TABLE IF NOT EXISTS public.address (
                id integer NOT NULL DEFAULT nextval('public.address_id_seq'),
                user_id integer NOT NULL,
                complement character varying,
                number integer NOT NULL,
                cep character varying NOT NULL,
                city_id integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                CONSTRAINT address_pkey PRIMARY KEY (id),
                CONSTRAINT user_fkey FOREIGN KEY (user_id)
                    REFERENCES public.user (id)
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT city_fkey FOREIGN KEY (city_id)
                    REFERENCES public.city (id)
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
            );

            ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;

            ALTER TABLE IF EXISTS public.address
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS public.address;
            DROP SEQUENCE IF EXISTS public.address_id_seq;
        `);
    }
}
