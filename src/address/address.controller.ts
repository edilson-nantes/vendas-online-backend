import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-typer.enum';

@Controller('address')
@Roles(UserType.User)
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ){};
    
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDTO: CreateAddressDTO,
        @Param('userId') userId: number
    ): Promise<AddressEntity> {
        return this. addressService.createAddress(createAddressDTO, userId);
    }
}
