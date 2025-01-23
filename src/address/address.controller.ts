import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-typer.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDTO } from './dtos/returnAddress.dto';

@Controller('address')
@Roles(UserType.User, UserType.Admin)
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ){};
    
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDTO: CreateAddressDTO,
        @UserId() userId: number
    ): Promise<AddressEntity> {
        return this. addressService.createAddress(createAddressDTO, userId);
    }

    @Get()
    @UsePipes(ValidationPipe)
    async findAddressByUserId(
        @UserId() userId: number
    ): Promise<ReturnAddressDTO[]> {
        return (await this.addressService.findAddressByUserId(userId)).map(address => new ReturnAddressDTO(address));
    }
}
