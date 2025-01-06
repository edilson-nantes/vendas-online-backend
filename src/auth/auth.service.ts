import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) {}
    
    async login(loginDTO: LoginDTO): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDTO.email)
            .catch(() => undefined);

        const isMatch = await compare(loginDTO.password, user?.password || '');

        if(!user || !isMatch){
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}
