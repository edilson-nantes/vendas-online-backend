import { CategoryEntity } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class ProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false})
    name: string;

    @Column({ name: 'category_id', nullable: false})
    categoryId: number;

    @Column({ name: 'price', nullable: false})
    price: number;

    @Column({ name: 'image', nullable: false})
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => CategoryEntity, (category: CategoryEntity) => category.products)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category?: CategoryEntity;
}