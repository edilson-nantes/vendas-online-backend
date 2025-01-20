import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-typer.enum";

export const userEntityMock: UserEntity = {
    cpf: '123456789',
    createdAt: new Date(),
    email: 'emailmock@getMaxListeners.com',
    id: 123456342,
    name: 'nameMock',
    password: 'largePassword',
    phone: '14997429872',
    typeUser: UserType.User,
    updatedAt: new Date(),
}