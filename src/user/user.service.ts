import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHasher } from '@nestjs/authentication';
import { UserEntity } from './interface/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/createUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private readonly passwordHasher: PasswordHasher
    ) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async createUser(createUserDto: CreateUser): Promise<UserEntity> {
 
        const passwordHashed = await this.passwordHasher.hash(createUserDto.password);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed
        });
    }
}
