import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-typer.enum';
import { ReturnProductDTO } from './dtos/return-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('product')
@Roles(UserType.Admin, UserType.User)
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Get()
    async findAllProducts(): Promise<ReturnProductDTO[]> {
        return (await this.productService.findAllProducts()).map(product => new ReturnProductDTO(product));
    }

    @Post()
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(createProductDTO);
    }
}
