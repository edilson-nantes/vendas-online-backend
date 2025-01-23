import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UserService } from "../../user/user.service";
import { userEntityMock } from "../../user/__mocks__/user.mock";
import { JwtService } from "@nestjs/jwt";
import { jwtMock } from "../__mocks__/jwt.mock";
import { loginUserMock } from "../__mocks__/login-user.mock";
import { ReturnUserDTO } from "../../user/dtos/returnUser.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";


describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if valid credentials', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDTO(userEntityMock),
    });
  });

  it('should return error if invalid password', async () => {
    expect(service.login({...loginUserMock, password:'invalidPassword'})).rejects.toThrow(UnauthorizedException);
  });

  it('should return error if invalid email', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrow(UnauthorizedException);
  });

  it('should return error', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrow(UnauthorizedException);
  });

});