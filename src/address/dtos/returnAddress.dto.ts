import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDTO {
    
    constructor(address: AddressEntity) {
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
    }
    
    complement: string;
    numberAddress: number;
    cep: string;
}