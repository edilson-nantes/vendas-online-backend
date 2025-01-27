import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnCategoryDTO } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-typer.enum';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ){}
    
    @Get()
    async findAllCategories(): Promise<ReturnCategoryDTO[]> {
        return (await this.categoryService.findAllCategories()).map((category) => new ReturnCategoryDTO(category));
    }

    @Post()
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategory: CreateCategoryDTO): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory);
    }
}
