import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './interface/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasher } from '@nestjs/authentication';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, PasswordHasher],
})
export class UserModule {}
