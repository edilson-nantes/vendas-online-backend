import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';

@Controller('user')
export class UserController {

    @Get()
    async getAllUsers() {
        return JSON.stringify({test: 'abc'})
    }

    @Post()
    async createUser(
        @Body() createUser:CreateUserDTO
    ){
        return {
            ...createUser,
            password: undefined
        };
    }
}
