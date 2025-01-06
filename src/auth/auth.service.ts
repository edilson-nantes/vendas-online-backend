import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/login.dto';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';
import { LoginPayloadDTO } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}
    
    async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDTO.email)
            .catch(() => undefined);

        const isMatch = await compare(loginDTO.password, user?.password || '');

        if(!user || !isMatch){
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
            user: new ReturnUserDTO(user)
        };
    }
}
