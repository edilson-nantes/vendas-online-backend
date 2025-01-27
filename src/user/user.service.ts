import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-typer.enum';

@Injectable()
export class UserService {
    

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){};

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDTO.email).catch(() => undefined);

        if(user) {
            throw new BadRequestException('Email already exists')
        }
        
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDTO.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDTO,
            typeUser: UserType.User,
            password: passwordHashed,
        });
    }

    async getUserbyIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city:{
                        state: true
                    }
                }
            },
        });
    }
    
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user){
            throw new NotFoundException(`User Id: ${userId} not found`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if(!user){
            throw new NotFoundException(`Email: ${email} not found`);
        }

        return user;
    }

}