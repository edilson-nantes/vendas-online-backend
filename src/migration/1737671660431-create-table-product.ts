import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProduct1737671660431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.product_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            CREATE TABLE IF NOT EXISTS public.product (
                id integer NOT NULL,
                category_id integer NOT NULL,
                name character varying NOT NULL,
                price double precision NOT NULL,
                image character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                CONSTRAINT product_pkey PRIMARY KEY (id),
                CONSTRAINT category_fkey FOREIGN KEY (category_id)
                    REFERENCES public.category(id)
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
            );
            
            ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
            
            ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.product;
        `);
    }

}
