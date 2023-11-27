import { AppService } from "../../src/service/app.service";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";

describe("AppService", () => {
  let appService: AppService;
  //   @typescript-eslint/no-unused-vars
  //   let modelMock: Model<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken("ShortUrl"),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    modelMock = module.get<Model<unknown>>(getModelToken("ShortUrl"));
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe("Hello World!");
    });
  });

  //   describe("getFullUrl", () => {
  //     it('should throw NotFoundException for non-existing shortUrl', async () => {
  //       // Mock the findOne method to return null, simulating a non-existing shortUrl
  //       modelMock.findOne.mockReturnValue({_id:6, full: "ghjh", short: "hjj"});

  //       // Assuming you have a valid 'data' object for testing
  //       const data = { shortUrl: "nonExistingShortUrl" };

  //       await expect(appService.getFullUrl(data)).rejects.toThrowError(NotFoundException);
  //     });
  //   });

  // Add more test cases for other methods as needed
});
