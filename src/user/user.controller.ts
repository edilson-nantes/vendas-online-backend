import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUser } from './dto/createUser.dto';
import { UserEntity } from './interface/user.entity';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getAllUsers() : Promise<UserEntity[]> {
        return this.userService.getAllUsers();
    }

    @Post()
    async createUser(@Body() createUser: CreateUser): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }
}
