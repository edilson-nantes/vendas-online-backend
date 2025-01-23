import { userEntityMock } from "../../user/__mocks__/user.mock";
import { AddressEntity } from "../entities/address.entity";
import { cityMock } from "../../city/__mocks__/city.mock";

export const addressMock: AddressEntity = {
    id: 54246,
    userId: userEntityMock.id,
    complement: 'complementoMock',
    numberAddress: 1360,
    cep: '45456-875',
    cityId: cityMock.id,
    createdAt: new Date(),
    updatedAt: new Date()
}