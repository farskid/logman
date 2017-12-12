const Logman = require("../src/index");

let suite = {};

beforeEach(() => {
  suite.logger = new Logman("test-logger");
});

afterAll(() => {
  suite = null;
});

describe("Logman", () => {
  it("should instantiate without error", () => {
    expect(suite.logger).not.toBe(undefined);
  });
  it("should have log, error, sleep, awake methods", () => {
    expect(suite.logger.log).not.toBe(undefined);
    expect(typeof suite.logger.log).toBe("function");
    expect(suite.logger.error).not.toBe(undefined);
    expect(typeof suite.logger.error).toBe("function");
    expect(suite.logger.sleep).not.toBe(undefined);
    expect(typeof suite.logger.sleep).toBe("function");
    expect(suite.logger.awake).not.toBe(undefined);
    expect(typeof suite.logger.awake).toBe("function");
  });
  it("should have type prop, passed to the instance", () => {
    expect(suite.logger.type).toBe("test-logger");
  });
  it("should be awaked by default", () => {
    expect(suite.logger.isSleep).toBe(false);
  });
  it("should put logger to sleep by calling logger.sleep()", () => {
    suite.logger.sleep();
    expect(suite.logger.isSleep).toBe(true);
  });
  it("should awaken the logger again by calling logger.awake()", () => {
    suite.logger.awake();
    expect(suite.logger.isSleep).toBe(false);
  });
});
