import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        private readonly categoryService: CategoryService,
    ) {}

    async findAllProducts(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();
        
        if (!products || products.length === 0) {
            throw new NotFoundException('Products not found');
        };

        return products;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<ProductEntity>{
        await this.categoryService.findCategoryById(createProductDTO.categoryId);

        return this.productRepository.save({
            ...createProductDTO,
        });
    }
}
