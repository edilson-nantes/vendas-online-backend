import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { StateService } from "../state.service";
import { StateEntity } from "../entities/state.entity";
import { stateMock } from "../__mocks__/state.mock";
import { BadRequestException } from "@nestjs/common";

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateMock]),
          }
        }
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return list of states', async () => {
    const state = await service.getAllStates();

    expect(state).toEqual([stateMock]);
  });

  it('should return error in exception', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValue(new BadRequestException);
    
    expect(service.getAllStates()).rejects.toThrow(BadRequestException);
  });

});