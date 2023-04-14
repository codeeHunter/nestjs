import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;

  const Userdto = {
    id: 1,
    surname: "dd",
    name: "dd",
    email: "chishok32@gmail.com",
    password: "213214421",
    phone: "89225215541",
  };

  const mockUserService = {
    createUser: jest.fn((dto) => {
      return { id: Date.now(), ...dto };
    }),

    getAllUsers: jest.fn(() => {
      return [{ ...Userdto }];
    }),

    addRole: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a User", () => {
    const dto = {
      surname: "dd",
      name: "dd",
      email: "chishok32@gmail.com",
      password: "213214421",
      phone: "89225215541",
    };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
  });

  it("should get a Users", () => {
    const dto = {
      surname: "dd",
      name: "dd",
      email: "chishok32@gmail.com",
      password: "213214421",
      phone: "89225215541",
    };

    expect(controller.getAll()).toEqual([
      {
        id: expect.any(Number),
        ...dto,
      },
    ]);

    expect(mockUserService.getAllUsers).toHaveBeenCalled();
  });

  it("should create a User", () => {
    const RoleDto = {
      value: "admin",
      userId: "1",
    };

    expect(controller.addRole(RoleDto)).toEqual({
      ...RoleDto,
    });

    expect(mockUserService.addRole).toHaveBeenCalled();
  });
});
