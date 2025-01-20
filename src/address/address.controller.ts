import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-typer.enum';
import { UserId } from '../decorators/user-id.decorator';

@Controller('address')
@Roles(UserType.User)
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
}
