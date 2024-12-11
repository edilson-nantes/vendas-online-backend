import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDTO } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser:CreateUserDTO): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }
    
    @Get()
    async getAllUsers(): Promise<ReturnUserDTO[]> {
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDTO(userEntity));
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
        return new ReturnUserDTO (
            await this.userService.getUserbyIdUsingRelations(userId)
        );
    }

}
