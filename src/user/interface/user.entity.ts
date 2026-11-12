import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({name: 'name', type: 'varchar', length: 100, nullable: false})
  name: string;

  @Column({name: 'email', type: 'varchar', length: 100, nullable: false})
  email: string;

  @Column({name: 'password', type: 'varchar', nullable: false, select: false})
  password: string;

  @Column({name: 'phone', type: 'varchar', length: 15, nullable: false})
  phone: string;

  @Column({name: 'cpf', type: 'varchar', length: 14, nullable: false})
  cpf: string;
}