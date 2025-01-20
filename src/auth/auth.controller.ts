import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async login(@Body() loginDTO: LoginDTO): Promise<ReturnLoginDTO>{
        return await this.authService.login(loginDTO);
    }
}
