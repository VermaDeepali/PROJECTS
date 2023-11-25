import { AppService } from "../../src/service/app.service";

describe("AppService", () => {
  let appController: AppService;

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
