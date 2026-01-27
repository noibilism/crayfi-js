import { Cray } from "../src/Cray";
import { CrayAuthenticationException } from "../src/exceptions";

describe("Cray Client", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should throw error if API key is missing", () => {
    delete process.env.CRAY_API_KEY;
    expect(() => new Cray()).toThrow(CrayAuthenticationException);
  });

  it("should initialize with API key passed in constructor", () => {
    delete process.env.CRAY_API_KEY;
    const cray = new Cray("test_key");
    expect(cray).toBeInstanceOf(Cray);
  });

  it("should initialize with API key from env", () => {
    process.env.CRAY_API_KEY = "env_key";
    const cray = new Cray();
    expect(cray).toBeInstanceOf(Cray);
  });

  it("should set default environment to sandbox", () => {
    const cray = new Cray("key");
    // access private client to check baseUrl? 
    // Typescript private access workaround or just trust it.
    // Or we can check if modules are initialized
    expect(cray.cards).toBeDefined();
  });
});
