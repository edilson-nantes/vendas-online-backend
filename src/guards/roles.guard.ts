import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDTO } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-typer.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    
        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
            ROLES_KEY,
            [context.getHandler(),context.getClass()]
        );
    
        if (!requiredRoles) {
            return true;
        }

        const { authorization } = context.switchToHttp().getRequest().headers;

        const loginPayload: LoginPayloadDTO | undefined =
            await this.jwtService.verify(authorization, {
                secret: process.env.JWT_SECRET
            });

        if (!loginPayload) {
            return false;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => role === loginPayload.typeUser);
    }
}