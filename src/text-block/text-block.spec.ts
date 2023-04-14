import { TextBlockService } from "./text-block.service";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { TextBlockController } from "./text-block.controller";

describe("TextBlockController", () => {
  let controller: TextBlockController;

  const MockDto = {
    id: 1,
    mainHeroText: "213214421",
    name: "dd",
    images: "vxzvxz",
    text: "vxzvxz",
    group: "film",
  };

  const mockTextBlockService = {
    createBlock: jest.fn((dto, images) => {
      return {
        images: images,
        ...dto,
      };
    }),

    getAllBlock: jest.fn(() => {
      return [MockDto];
    }),

    getGroup: jest.fn((group) => {
      return [MockDto].filter((value) => {
        return group === value.group;
      });
    }),

    getBlockById: jest.fn((id) => {
      return [MockDto].filter((value) => {
        return id === value.id;
      });
    }),

    deleteBlock: jest.fn((id) => {
      return [MockDto].filter((value) => {
        return id === value.id;
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextBlockController],
      providers: [TextBlockService, JwtService],
    })
      .overrideProvider(TextBlockService)
      .useValue(mockTextBlockService)
      .compile();

    controller = module.get<TextBlockController>(TextBlockController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a TextBlock", async () => {
    const result = await controller.create(MockDto, "gsad").then((result) => {
      expect(result).toEqual({
        ...MockDto,
      });
    });

    expect(mockTextBlockService.createBlock).toHaveBeenCalledWith(
      MockDto,
      "gsad"
    );
  });

  it("should get all TextBlocks", async () => {
    const result = await controller.getAll().then((result) => {
      expect(result).toEqual([
        {
          ...MockDto,
        },
      ]);
    });

    expect(mockTextBlockService.getAllBlock).toHaveBeenCalled();
  });

  it("should filters a TextBlock", () => {
    return controller.getGroup("film").then((result) => {
      expect(result).toEqual([
        {
          id: expect.any(Number),
          ...MockDto,
        },
      ]);
    });
  });

  it("should get by id a TextBlock", () => {
    return controller.getById(1).then((result) => {
      expect(result).toEqual([
        {
          id: expect.any(Number),
          ...MockDto,
        },
      ]);
    });
  });

  it("should delete by id a TextBlock", () => {
    return controller.deleteBlock(1).then((result) => {
      expect(result).toEqual([
        {
          id: expect.any(Number),
          ...MockDto,
        },
      ]);
    });
  });
});
