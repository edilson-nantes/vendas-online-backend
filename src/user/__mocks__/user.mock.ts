import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-typer.enum";

export const userEntityMock: UserEntity = {
    cpf: '123456789',
    createdAt: new Date(),
    email: 'dilso@teste',
    id: 123456342,
    name: 'nameMock',
    password: '$2a$10$4F1FlGdSVnFM2ky4CQsxeuMUXc8QhJcvQmi4FAnMJUISusPLi0..q',
    phone: '14997429872',
    typeUser: UserType.User,
    updatedAt: new Date(),
}