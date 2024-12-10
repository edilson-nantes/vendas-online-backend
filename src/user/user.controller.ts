import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDTO } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<ReturnUserDTO[]> {
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDTO(userEntity));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser:CreateUserDTO): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }
}
