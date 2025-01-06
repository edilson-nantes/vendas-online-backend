import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async login(@Body() loginDTO: LoginDTO): Promise<ReturnUserDTO>{
        return new ReturnUserDTO(await this.authService.login(loginDTO));
    }
}
